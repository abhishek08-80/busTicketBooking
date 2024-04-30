// Import your service class from the service file
import EmployeeService from '../services/employee';
import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import grpc from '@grpc/grpc-js';

const server = new Server();


const PROTO_PATH = './employee.proto'; // Path to your proto file
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const employeePackage = grpc.loadPackageDefinition(packageDefinition).employee;

server.addService(employeePackage.service, {
  CreateEmployee: async (call, callback) => {
    try {
      const requestData = call.request; // Get the data from the request
      const result = await EmployeeService.createEmployeeService(requestData);
      callback(null, result); // Return response to the client
    } catch (error) {
      callback(error); // Handle errors
    }
  },

  UpdateEmployee: async (call, callback) => {
    try {
      const requestData = call.request; // Get the data from the request
      const result = await EmployeeService.updateEmployeeService(requestData);
      callback(null, result); // Return response to the client
    } catch (error) {
      callback(error); // Handle errors
    }
  },

  DeleteEmployee: async (call, callback) => {
    try {
      const requestData = call.request; // Get the data from the request
      const result = await EmployeeService.deleteEmployeeService(requestData);
      callback(null, result); // Return response to the client
    } catch (error) {
      callback(error); // Handle errors
    }
  }
});
