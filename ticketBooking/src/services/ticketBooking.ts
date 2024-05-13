import ticketBookingModel from '../model/ticketBooking';
import logger from '../utills/logger/logger';
import { ITicketBookingAttributes } from '../utills/interface/interface';

export default class TicketBookingService {
  
  /**create  bus ticket
   *@description function to create bus ticket
   *@param data
   *@developedBy Vijaya Kumari
   */
  public static async createTicketService(data: ITicketBookingAttributes) {
    try {
      // Validate input data
      if (!data.seatNumber || !data.bookingDate) {
        return ('Seat number and booking date are required.');
      }

      // Check if the seat is already booked
      const existingTicket = await ticketBookingModel.ticketBooking.findOne({
        where: { seatNumber: data.seatNumber, isDeleted: false },
      });

      if (existingTicket) {
        return 'Seat already booked.';
      }

      // Additional checks if needed

      return await ticketBookingModel.ticketBooking.create(data);
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to create ticket.');
    }
  }

  /**update  bus ticket
   *@description function to update bus ticket
   *@param data
   *@param id ticketId
   *@developedBy Vijaya Kumari
   */

  public static async updateTicketService(data: ITicketBookingAttributes, id: string) {
    try {
      // Validate ID
      if (!id) {
        return ('Ticket ID is required for updating.');
      }

      const ticket = await ticketBookingModel.ticketBooking.findByPk(id);

      if (!ticket) {
        return 'Ticket does not exist.';
      }

      // Perform update
      return await ticket.update(data);
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to update ticket.');
    }
  }

  /**delete  bus ticket
   *@description function to delete bus ticket
   *@param id ticketId
   *@developedBy Vijaya Kumari
   */

  public static async deleteTicketService(id: string) {
    try {
      // Validate ID
      if (!id) {
        return ('Ticket ID is required for deletion.');
      }

      const ticket = await ticketBookingModel.ticketBooking.findByPk(id);

      if (!ticket) {
        return 'Ticket does not exist.';
      }

      // Perform delete
      await ticket.update({
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: id,
      });

      return 'Ticket deleted successfully.';
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to delete ticket.');
    }
  }

  /**get all  bus ticket
   *@description function to get all  bus ticket
   *@developedBy Vijaya Kumari
   */

  public static async getAllTicketService() {
    try {
      const tickets = await ticketBookingModel.ticketBooking.findAll({ limit: 10 });

      if (!tickets || tickets.length === 0) {
        return 'No tickets available.';
      }

      return tickets;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve tickets.');
    }
  }

  /**get a particular  bus ticket
   *@description function to get a particular  bus ticket
   *@param id ticketId
   *@developedBy Vijaya Kumari
   */
  public static async getTicketByIdService(id: string) {
    try {
      // Validate ID
      if (!id) {
        return ('Ticket ID is required for retrieval.');
      }

      const ticket = await ticketBookingModel.ticketBooking.findByPk(id);

      if (!ticket) {
        return 'Ticket not found.';
      }

      return ticket;
    } catch (err) {
      logger.error(err);
      throw new Error('Failed to retrieve ticket.');
    }
  }
}
