const PROTO_PATH = '../../../employee.proto';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from "path"
import employee from '../services/employeeServices'


const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const employeeProto: any = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();


export function empServer() {
    server.addService(employeeProto.EmployeeService.service, {

        // validEmployee: async (call, callback) => { 
        //     const employeeId = call.request.id; 
        //     console.log("call ", call.request)
        //     console.log("employeeId", employeeId)
        //     // Call the getEmployeeById function from employeeController
        //     let data = await employee.getEmployeeByIdService(employeeId) 
        //     console.log(data, "data")
        //     if (data == 'userDoesNotExist'){ 
        //         return null
        //     }else{
        //         return data
        //     }

        // }
        validEmployee: async (call, callback) => {
            const employeeId = call.request.id;
            console.log("call ", call.request);
            console.log("employeeId", employeeId);

            try {
                // Call the getEmployeeById function from employeeController
                const data = await employee.getEmployeeByIdService(employeeId);
                console.log(data, "data");

                if (data == 'userDoesNotExist') {
                    callback(null, null); // Return null if user does not exist
                } else {
                    callback(null, data); // Return data if user exists
                }
            } catch (error) {
                console.error("Error occurred:", error);
                callback(error); // Return error if something goes wrong
            }
        }
    });

    server.bindAsync(
        '127.0.0.1:30053',
        grpc.ServerCredentials.createInsecure(),
        () => {
            server.start();
            console.log('gRPC server started on port 127.0.0.1:30053');
        }
    );
}




