import { Model } from 'sequelize';
import { places } from '../enums/enum';

export interface IBusAttributes {
  id?: string
  from: places
  to?: places
  totalSeats?: number
  date?: Date
  time?: TimeRanges
  employeeId: string
  price: number
  isAvailable: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  deletedBy?: string
  isDeleted?: boolean
}

export class bus extends Model<IBusAttributes> implements IBusAttributes {
  id?: string;
  from: places;
  to?: places;
  totalSeats?: number;
  date?: Date;
  time?: TimeRanges;
  employeeId: string;
  price: number;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  deletedBy?: string;
  isDeleted?: boolean;
}



