const PROTO_PATH = '../protos/employee.proto';

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const employeeProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// const users = [
//   {
//     name: 'abhi',
//     email: 'abhi@gmail.com',
//     age: 22,
//   },
//   {
//     name: 'rajneshwar',
//     email: 'rajneshwar@gmail.com',
//     age: 25,
//   },
// ];
// const posts = [
//   {
//     title: 'first post',
//     Image: 'abc.png',
//   },
//   {
//     title: 'first post',
//     Image: 'abc.png',
//   },
// ];

console.log(employeeProto);

// server.addService(employeeProto, {
//   allEmployee: (_, callback) => {
//     callback(null, { users });
//   },
//   employeeById: (_, callback) => {
//     callback(null, { posts });
//   },
// });

server.bindAsync(
  '127.0.0.1:30033',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log('server started on port 127.0.0.1:30033');
  }
);
