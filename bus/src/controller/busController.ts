import { Request, Response } from 'express';
// import userService from '../services/customer';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import bus from '../services/busServices';



export default class busController {

  public static async createBus(req: Request, res: Response) {
    try {
      const data = await bus.createBusService(req.body);
      if (data == 'employeeDoesNotExist') {
      // if (data ) {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              // data,
              message.notExist('Employee'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.add('Bus')));
      }
    } catch (err) {
      logger.error(message.errorLog('busAdd', 'busController', err));
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

  public static async deleteBus(req: Request, res: Response) {
    try {
      const data = await bus.deleteBusService(req.params);
      if (data == 'busDoesNotExist') {
        res
          .status(statusCode.badRequest)
          .json(
            successResponse(
              statusCode.badRequest,
              data,
              message.notExist('Bus'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.add('Bus')));
      }
    } catch (err) {
      logger.error(message.errorLog('busAdd', 'busController', err));
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

  public static async updateBus(req: Request, res: Response) {
    try {
      const data = req.body;
      const busId: string = req.params.id;

      const busData = await bus.updateBusService(
        data,
        busId
      );
      if (busData == 'busDoesNotExist') {
        res
          .status(statusCode.badRequest)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.notExist('bus'),
            ),
          );
      }
      else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.update('Bus')));
      }
    } catch (err) {
      logger.error(message.errorLog('busUpdate', 'busController', err));
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


  public static async getAllBus(req: Request, res: Response) {
    try {
      const data = await bus.getAllBusService();
      if (data == 'busDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.notExist('Bus'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.fetch('Bus')));
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

  public static async getBusById(req: Request, res: Response) {
    try {
      const busId: string = req.params.id;
      const data = await bus.getBusByIdService(busId);
      if (data == 'busDoesNotExist') {
        res
          .status(statusCode.notFound)
          .json(
            failResponse(
              statusCode.badRequest,
              data,
              message.notExist('Bus'),
            ),
          );
      } else {
        res
          .status(statusCode.success)
          .json(successResponse(statusCode.success, data, message.fetch('Bus')));
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
