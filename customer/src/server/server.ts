const PROTO_PATH = '../../../customer.proto';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
console.log('newpath++++++++++++++', path.resolve(__dirname, PROTO_PATH));
import customer from '../services/customerServices';

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const customerProto : any = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();


export function empServer() {
  console.log('In___________');
  server.addService(customerProto.CustomerService.service, {
   
    validCustomer: async (call, callback) => {
      const customerId = call.request.id;
      console.log('call ', call.request);
      console.log('customerId', customerId);

      try {
        // Call the getBusById function from busController
        const data = await customer.getCustomerByIdService(customerId);
        console.log(data, 'data');

        if (data == 'customerDoesNotExist') {
          callback(null, null); // Return null if user does not exist
        } else {
          callback(null, data); // Return data if user exists
        }
      } catch (error) {
        console.error('Error occurred:', error);
        callback(error); // Return error if something goes wrong
      }
    },
  });

  server.bindAsync('127.0.0.1:30088', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('server started on port 127.0.0.1:30088');
  });
}
