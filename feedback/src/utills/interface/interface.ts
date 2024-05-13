import {  Model } from 'sequelize';

export interface IFeedbackAttributes {
  id?: string
  customerId: string
  message:string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  deletedBy?: string
  isDeleted?: boolean
}

export class Feedback extends Model<IFeedbackAttributes> implements IFeedbackAttributes {
  public id?: string;
  public customerId: string;
  public message:string
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public deletedBy?: string;
  public isDeleted?: boolean;
}



