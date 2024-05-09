import { Role } from '../enums/enum';
import {  Model } from 'sequelize';

export interface IEmployeesAttributes {
  id?: string
  firstName: string
  lastName?: string
  address?: string
  Dob?: Date
  phoneNo?: number
  email: string
  password: string
  deletedAt?: Date
  deletedBy?: string
  isDeleted?: boolean
  role?: Role
  otp?: number
  otpExpiration?: Date
}

export interface IEmployeeUpdatePassword extends IEmployeesAttributes {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

export class employees extends Model<IEmployeesAttributes> implements IEmployeesAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName?: string;
  public address?: string;
  public Dob?: Date;
  public phoneNo!: number;
  public deletedAt?: Date;
  public deletedBy?: string;
  public isDeleted?: boolean;
  public role?: Role;
  public otp?: number;
  public otpExpiration?: Date;
}

export interface ITokenDetail {
  id?: string,
  firstName?: string,
  email?: string,
  role?: Role
}

