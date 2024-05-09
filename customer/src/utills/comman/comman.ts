import bcrypt from 'bcrypt';
import { ITokenDetail } from '../../utills/interface/interface';
import jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

const saltRounds = parseInt(process.env.SaltRounds);

export async function hashPassword(plainPassword: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plainPassword, salt);
}

export async function comparePassword(plainPassword: string, hash: string) {
  return await bcrypt.compareSync(plainPassword, hash);
}


export default class CommonFunction {
  private jwtInstance: typeof jwt;

  constructor(jwtInstance: typeof jwt) {
    this.jwtInstance = jwtInstance;
  }



  async generateToken(data: ITokenDetail) {

    const secret = process.env.TOKEN_KEY;
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }

    const token: string = await this.jwtInstance.sign(data, secret, {
      expiresIn: 10000,
    });
    return token;
  }
}


export const mailTransporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
