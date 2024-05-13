import {  Model } from 'sequelize';

export interface ITicketBookingAttributes {
  id?: string
  date?: Date
  time?: TimeRanges
  busId: string
  customerId: string
  seatNumber:number
  price: number
  routeNumber: number
  bookingDate: Date
  travelingDate: Date
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  deletedBy?: string
  isDeleted?: boolean
}

export class ticketBooking extends Model<ITicketBookingAttributes> implements ITicketBookingAttributes {
  public id?: string;
  public totalSeats?: number;
  public date?: Date;
  public time?: TimeRanges;
  public busId: string;
  public customerId: string;
  public seatNumber:number;
  public price: number;
  public routeNumber: number;
  public bookingDate: Date;
  public travelingDate: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public deletedBy?: string;
  public isDeleted?: boolean;
}



