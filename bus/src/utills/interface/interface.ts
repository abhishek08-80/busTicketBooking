import { Model } from 'sequelize';
import { places } from '../enums/enum';
import {Role} from '../enums/enum';

export interface IBusAttributes {
  id?: string
  from: places
  to: places
  totalSeats?: number
  date?: Date
  time?: TimeRanges
  employeeId: string
  price: number
  isAvailable: boolean
  deletedAt?: Date
  deletedBy?: string
  isDeleted?: boolean
}

export class bus extends Model<IBusAttributes> implements IBusAttributes {
  id?: string;
  from: places;
  to: places;
  totalSeats?: number;
  date?: Date;
  time?: TimeRanges;
  employeeId: string;
  price: number;
  isAvailable: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  isDeleted?: boolean;
}

export interface ITokenDetail {
  id?: string,
  firstName?: string,
  email?: string,
  role?: Role
}

