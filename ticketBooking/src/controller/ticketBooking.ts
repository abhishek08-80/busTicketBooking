import { Request, Response } from 'express';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import ticketBooking from '../services/ticketBooking';

export default class employeeTicket {
  // function for adding new employee
  public static async createTicket(req: Request, res: Response) {
    try {
      const data = await ticketBooking.createTicketService(req.body);
      if (data == 'Seat number and booking date are required.') {
        res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, data, message.alreadyExist('Ticket')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.add('Ticket')));
      }
    } catch (err) {
      logger.error(message.errorLog('ticketAdd', 'ticketController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // funtion for deleteing employee
  public static async deleteTicket(req: Request, res: Response) {
    try {
      const data = await ticketBooking.deleteTicketService(req.body);
      if (data == 'Ticket ID is required for deletion.') {
        res.status(statusCode.badRequest).json(successResponse(statusCode.badRequest, data, message.alreadyExist('Ticket')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.add('Ticket')));
      }
    } catch (err) {
      logger.error(message.errorLog('ticketAdd', 'ticketController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // function fir updating employee details except for password
  public static async updateTicket(req: Request, res: Response) {
    try {
      const data = req.body;
      const TicketId: string = req.params.id;

      const customerData = await ticketBooking.updateTicketService(data, TicketId);
      if (customerData == 'Ticket ID is required for updating.') {
        res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, data, message.alreadyExist('Ticket')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.update('Ticket')));
      }
    } catch (err) {
      logger.error(message.errorLog('ticketUpdate', 'ticketController', err));
      res.status(statusCode.emailOrUserExist).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }


  public static async getTicketById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await ticketBooking.getTicketByIdService(id);
      if (data == 'Ticket ID is required for retrieval.') {
        res.status(statusCode.notFound).json(failResponse(statusCode.badRequest, data, message.notExist('Ticket')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.fetch('Ticket')));
      }
    } catch (err) {
      logger.error(message.errorLog('ticketAdd', 'ticketController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // function for getting all employee
  public static async getTicket(req: Request, res: Response) {
    try {
      const data = await ticketBooking.getAllTicketService();
      if (data == 'No tickets available.') {
        res.status(statusCode.notFound).json(failResponse(statusCode.badRequest, data, message.notExist('Tickets')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.fetch('Tickets')));
      }
    } catch (err) {
      logger.error(message.errorLog('ticketAdd', 'ticketController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

}
