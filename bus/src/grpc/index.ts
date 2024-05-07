const PROTO_PATH = '../../../employee.proto';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from "path"

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const UserService: any = grpc.loadPackageDefinition(packageDefinition).EmployeeService;

const client = new UserService(
    "localhost:30053",
    grpc.credentials.createInsecure()
);

export default client;
