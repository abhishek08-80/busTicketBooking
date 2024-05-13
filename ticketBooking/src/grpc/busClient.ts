const PROTO_PATH = '../../../bus.proto';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH), {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const UserService: any = grpc.loadPackageDefinition(packageDefinition).BusService;

const client = new UserService('localhost:30066', grpc.credentials.createInsecure());

export default client;

