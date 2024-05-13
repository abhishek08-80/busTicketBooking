import feedbackModel from '../model/feedback';
import logger from '../utills/logger/logger';
import {
  IFeedbackAttributes
} from '../utills/interface/interface';

export default class FeedbackService {
  
  /**create feedback
   *@description function to create feedback
   *@param data
   *@developedBy Vijaya Kumari
   */
  public static async createFeedbackService(data: IFeedbackAttributes) {
    try {
      // Validate input data
      if (!data.customerId || !data.message) {
        return('User ID and message are required for feedback.');
      }

      return await feedbackModel.create(data);
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to create feedback.');
    }
  }

  /**update feedback
   *@description function to update feedback
   *@param data
   *@param id feedbackId
   *@developedBy Vijaya Kumari
   */
  public static async updateFeedbackService(data: IFeedbackAttributes, id: string) {
    try {
      // Validate ID
      if (!id) {
        return ('Feedback ID is required for updating.');
      }

      const feedback = await feedbackModel.findByPk(id);

      if (!feedback) {
        return 'Feedback does not exist.';
      }

      // Perform update
      return await feedback.update(data);
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to update feedback.');
    }
  }

  /**delete feedback
   *@description function to delete feedback
   *@param id feedbackId
   *@developedBy Vijaya Kumari
   */
  public static async deleteFeedbackService(id: string) {
    try {
      // Validate ID
      if (!id) {
        return ('Feedback id is required for deletion.');
      }

      const feedback = await feedbackModel.findByPk(id);

      if (!feedback) {
        return 'Feedback does not exist.';
      }

      // Perform delete
      await feedback.destroy();

      return 'Feedback deleted successfully.';
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to delete feedback.');
    }
  }

  /**get all feedback
   *@description function to get all feedback
   *@developedBy Vijaya Kumari
   */
  public static async getAllFeedbackService() {
    try {
      const feedbacks = await feedbackModel.findAll({ limit: 10 });

      if (!feedbacks || feedbacks.length === 0) {
        return 'No feedbacks available.';
      }

      return feedbacks;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve feedbacks.');
    }
  }

  /**get a particular feedback
   *@description function to get a particular feedback
   *@param id feedbackId
   *@developedBy Vijaya Kumari
   */
  public static async getFeedbackByIdService(id: string) {
    try {
      // Validate ID
      if (!id) {
        return ('Feedback ID is required for retrieval.');
      }

      const feedback = await feedbackModel.findByPk(id);

      if (!feedback) {
        return 'Feedback not found.';
      }

      return feedback;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve feedback.');
    }
  }
}
