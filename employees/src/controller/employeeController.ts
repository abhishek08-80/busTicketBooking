import { Request, Response } from 'express';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import employee from '../services/employeeServices';



export default class employeeController {

  // function for adding new employee
  public static async createEmployee(req: Request, res: Response) {
    try {
      const data = await employee.createEmployeeService(req.body);
      if (data == 'userAlreadyExist') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.alreadyExist('User'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.add('User')));
      }
    } catch (err) {
      logger.error(message.errorLog('userAdd', 'userController', err));
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  // funtion for deleteing employee 
  public static async deleteEmployee(req: Request, res: Response) {
    try {
      const data = await employee.deleteEmployeeService(req.params);
      if (data == 'userDoesNotExist') {
        res
          .status(statusCode.badRequest)
          .json(
            successResponse(
              statusCode.badRequest,
              data,
              message.alreadyExist('User'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.add('User')));
      }
    } catch (err) {
      logger.error(message.errorLog('userAdd', 'userController', err));
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  // function fir updating employee details except for password
  public static async updateEmployee(req: Request, res: Response) {
    try {
      const data = req.body;
      const EmployeeId: string = req.params.id;

      const customerData = await employee.updateEmployeeService(
        data,
        EmployeeId,
      );
      if (customerData == 'passwordCannotBeUpdated') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.notAllowed, data, message.invalidRequest));
      } else if (customerData == 'userDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.emailOrUserExist,
              data,
              message.notExist('User'),
            ),
          );
      } else if (customerData == 'emailAlreadyTaken') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.alreadyExist('Email'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.update('User')));
      }
    } catch (err) {
      logger.error(message.errorLog('userUpdate', 'userController', err));
      res
        .status(statusCode.emailOrUserExist)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  // function for updating password for employee
  public static async changePassword(req: Request, res: Response) {
    try {
      const data = req.body;
      const CustomerId: string = req.params.id;

      const customerData = await employee.changePasswordService(
        data,
        CustomerId,
      );
      if (customerData == 'newPassword!=ConfirmPassword') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.notAllowed, data, message.invalidRequest));
      } else if (customerData == 'userDoesNotExists') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.emailOrUserExist,
              data,
              message.notExist('User'),
            ),
          );
      } else if (customerData == 'oldPasswordIncorrect') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.badRequest, data, message.invalidRequest));
      } else {
        res
          .status(statusCode.success)
          .json(
            successResponse(statusCode.success, data, message.update('Password')),
          );
      }
    } catch (err) {
      logger.error(message.errorLog('userUpdate', 'userController', err));
      res
        .status(statusCode.emailOrUserExist)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  // function for resetting password for employee through otp 
  public static async resetPassword(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await employee.resetPasswordService(data);
      if (customerData == 'newPassword!== confirmPassword') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.notAllowed, data, message.invalidRequest));
      } else if (customerData == 'userDoesNotExists') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.emailOrUserExist,
              data,
              message.notExist('User'),
            ),
          );
      } else if (customerData == 'incorrectOtp') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.badRequest, data, message.invalidRequest));
      } else if (customerData == 'otpExpired') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.badRequest, data, message.otpExpired));
      } else {
        res
          .status(statusCode.success)
          .json(
            successResponse(statusCode.success, data, message.update('Password')),
          );
      }
    } catch (err) {
      logger.error(message.errorLog('userUpdate', 'userController', err));
      res
        .status(statusCode.emailOrUserExist)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  // function for sending otp through email for employee
  public static async resetPasswordEmail(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await employee.resetPasswordEmailService(data);
      if (customerData == 'userDoesNotExists') {
        res
          .status(statusCode.badRequest)
          .json(failResponse(statusCode.notAllowed, data, message.invalidRequest));
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data.otp, message.sent('OTP')));
      }
    } catch (err) {
      logger.error(message.errorLog('userUpdate', 'userController', err));
      res
        .status(statusCode.emailOrUserExist)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  public static async getEmployeeById(req: Request, res: Response) {
    try {
      const Data = req.params.id
      const data = await employee.getEmployeeByIdService(Data);
      if (data == 'userDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(statusCode.badRequest, data, message.notExist('User')),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.fetch('User')));
      }
    } catch (err) {
      logger.error(message.errorLog('userAdd', 'userController', err));
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }


  // function for getting all employee
  public static async getEmployee(req: Request, res: Response) {
    try {
      const data = await employee.getAllService();
      if (data == 'userDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(statusCode.badRequest, data, message.notExist('User')),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.fetch('User')));
      }
    } catch (err) {
      logger.error(message.errorLog('userAdd', 'userController', err));
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }

  // function for employee to login and generate token
  public static async loginEmployee(req: Request, res: Response) {
    try {
      const data = await employee.loginEmployeeService(req.body);
      if (data == 'userDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(statusCode.badRequest, data, message.notExist('User')),
          );
      } else if (data == 'incorrectPassword') {
        res
          .status(statusCode.wrongPassword)
          .json(failResponse(statusCode.badRequest, data, message.invalidlogin));
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.login));
      }
    } catch (err) {
      logger.error(message.errorLog('userAdd', 'userController', err));
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            err.message,
            message.somethingWrong,
          ),
        );
    }
  }
}