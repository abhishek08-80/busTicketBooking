import { Request, Response } from 'express';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import employee from '../services/employee';



export default class employeeController {

  // function for adding new employee
  async createEmployee(req: Request, res: Response) {
    try {
      const data = await new employee().createEmployeeService(req.body);
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
  async deleteEmployee(req: Request, res: Response) {
    try {
      const data = await new employee().deleteEmployeeService(req.params);
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
  async updateEmployee(req: Request, res: Response) {
    try {
      const data = req.body;
      const EmployeeId: string = req.params.id;

      const customerData = await new employee().updateEmployeeService(
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
  async changePassword(req: Request, res: Response) {
    try {
      const data = req.body;
      const CustomerId: string = req.params.id;

      const customerData = await new employee().changePasswordService(
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
  async resetPassword(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await new employee().resetPasswordService(data);
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
  async resetPasswordEmail(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await new employee().resetPasswordEmailService(data);
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

  // function for getting all employee
  async getEmployee(req: Request, res: Response) {
    try {
      const data = await new employee().getAllService();
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
  async loginEmployee(req: Request, res: Response) {
    try {
      const data = await new employee().loginEmployeeService(req.body);
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