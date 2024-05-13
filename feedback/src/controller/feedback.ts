import { Request, Response } from 'express';
import { successResponse, failResponse } from '../utills/response/response';
import { statusCode, message } from '../utills/response/constrant';
import logger from '../utills/logger/logger';
import feedback from '../services/feedback';

export default class employeefeedback {
  // function for adding new feedback
  public static async createFeedback(req: Request, res: Response) {
    try {
      const data = await feedback.createFeedbackService(req.body);
      if (data == 'User ID and message are required for feedback.') {
        res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, data, message.alreadyExist('feedback')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.add('feedback')));
      }
    } catch (err) {
      logger.error(message.errorLog('feedbackAdd', 'feedbackController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // funtion for deleteing feedback
  public static async deleteFeedback(req: Request, res: Response) {
    try {
      const data = await feedback.deleteFeedbackService(req.body);
      if (data == 'Feedback id is required for deletion.') {
        res.status(statusCode.badRequest).json(successResponse(statusCode.badRequest, data, message.alreadyExist('feedback')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.add('feedback')));
      }
    } catch (err) {
      logger.error(message.errorLog('feedbackAdd', 'feedbackController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // function fir updating feedback details except for password
  public static async updateFeedback(req: Request, res: Response) {
    try {
      const data = req.body;
      const feedbackId: string = req.params.id;

      const customerData = await feedback.updateFeedbackService(data, feedbackId);
      if (customerData == 'Feedback ID is required for updating.') {
        res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, data, message.alreadyExist('feedback')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.update('feedback')));
      }
    } catch (err) {
      logger.error(message.errorLog('feedbackUpdate', 'feedbackController', err));
      res.status(statusCode.emailOrUserExist).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // function to get a feedback by id
  public static async getFeedbackById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await feedback.getFeedbackByIdService(id);
      if (data == 'Feedback ID is required for retrieval.') {
        res.status(statusCode.notFound).json(failResponse(statusCode.badRequest, data, message.notExist('feedback')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.fetch('feedback')));
      }
    } catch (err) {
      logger.error(message.errorLog('feedbackAdd', 'feedbackController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // function for getting all feedback
  public static async getFeedback(req: Request, res: Response) {
    try {
      const data = await feedback.getAllFeedbackService();
      if (data == 'No feedbacks available.') {
        res.status(statusCode.notFound).json(failResponse(statusCode.badRequest, data, message.notExist('feedbacks')));
      } else {
        res.status(statusCode.success).json(successResponse(statusCode.success, data, message.fetch('feedbacks')));
      }
    } catch (err) {
      logger.error(message.errorLog('feedbackAdd', 'feedbackController', err));
      res.status(statusCode.badRequest).json(failResponse(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

}

 
 
