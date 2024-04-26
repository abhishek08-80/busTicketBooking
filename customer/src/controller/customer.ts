import { Request, Response } from 'express';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import customer from '../services/customer';



export default class customerController {
  static createCustomer;
  static updateCustomer;
  static deleteCustomer;
  static getCustomer;

  //add new user function
  async createCustomer(req: Request, res: Response) {
    try {
      const data = await new customer().createCustomerService(req.body);
      //if the customer with the same email exists
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
  // delete customer function
  async deleteCustomer(req: Request, res: Response) {
    try {
      const data = await new customer().deleteCustomerService(req.params);
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

  // customer can update all the fields except password
  async updateCustomer(req: Request, res: Response) {
    try {
      const data = req.body;
      const CustomerId: string = req.params.id;

      const customerData = await new customer().updateCustomerService(
        data,
        CustomerId
      );
      if (customerData == 'userDoesNotExist') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.notExist('User'),
            ),
          );
      }
      else if (customerData == 'emailAlreadyTaken') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.notAllowed,
              data,
              message.alreadyExist('User'),
            ),
          );
      }
      else {
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

  // function for changing password 
  async changePassword(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await new customer().changePasswordService(
        data,
      );
      if (customerData == 'newPassword!=ConfirmPassword') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.notAllowed,
              data,
              message.invalidRequest,
            ),
          );
      }
      else if (customerData == 'userDoesNotExists') {
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
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.invalidRequest,
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.update('Password')));
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

  // function for setting customer password
  async resetPassword(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await new customer().resetPasswordService(
        data,
      );
      if (customerData == 'newPassword!== confirmPassword') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.notAllowed,
              data,
              message.invalidRequest,
            ),
          );
      }
      else if (customerData == 'userDoesNotExists') {
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
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.invalidRequest,
            ),
          );
      } else if (customerData == 'otpExpired') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.otpExpired,
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.update('Password')));
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




  // function for sending otp for reset password 
  async resetPasswordEmail(req: Request, res: Response) {
    try {
      const data = req.body;

      const customerData = await new customer().resetPasswordEmailService(
        data,
      );
      if (customerData == 'userDoesNotExists') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.notAllowed,
              data,
              message.invalidRequest,
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.sent('OTP')));
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



  // get all customers function
  async getCustomer(req: Request, res: Response) {
    try {
      const data = await new customer().getCustomerService();
      if (data == 'userDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.notExist('User'),
            ),
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

  // function for customer to login
  async loginCustomer(req: Request, res: Response) {
    try {
      const data = await new customer().loginCustomerService(req.body);
      if (data == 'userDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.notExist('User'),
            ),
          );
      }
      else if (data == 'incorrectPassword') {
        res
          .status(statusCode.wrongPassword)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.invalidlogin,
            ),
          );
      }
      else {
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
