import { Request, Response } from 'express';
// import userService from '../services/customer';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import customer from '../services/bus';



export default class busController {

  async createBus(req: Request, res: Response) {
    try {
      const data = await new customer().createBusService(req.body);
      // if (data == 'userAlreadyExist') {
      if (data ) {

        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              // data,
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

  async deleteBus(req: Request, res: Response) {
    try {
      const data = await new customer().deleteBusService(req.params);
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

  async updateBus(req: Request, res: Response) {
    try {
      const data = req.body;
      const CustomerId: string = req.params.id;

      const customerData = await new customer().updateBusService(
        data,
        CustomerId
      );
      if (customerData) {
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
      // else if (customerData == 'emailAlreadyTaken') {
      //   res
      //     .status(statusCode.notFound)
      //     .json(
      //       failResponse(
      //         statusCode.notAllowed,
      //         data,
      //         message.alreadyExist('User'),
      //       ),
      //     );
      // }
      // else {
      //   res
      //     .status(statusCode.success)
      //     .json(successResponse(statusCode.success, data, message.update('User')));
      // }
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


  async getBus(req: Request, res: Response) {
    try {
      const data = await new customer().getBusService();
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

}
