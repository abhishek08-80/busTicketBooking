import bcrypt from 'bcrypt'
import { ITokenDetail } from '../../utills/interface/interface';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../../../env';

const saltRounds = 10

export async function hashPassword(plainPassword: string) {
  const salt = await bcrypt.genSaltSync(saltRounds)
  return await bcrypt.hashSync(plainPassword, salt)
}

export async function comparePassword(plainPassword: string, hash: string) {
  return await bcrypt.compareSync(plainPassword, hash)
}


export default class CommonFunction {
  private jwtInstance: typeof jwt;

  constructor(jwtInstance: typeof jwt) {
    this.jwtInstance = jwtInstance;
  }



  async generateToken(data: ITokenDetail) {
    try {
      const secret = TOKEN_KEY;
      if (!secret) {
        throw new Error('JWT secret is not defined');
      }

      const token: string = await this.jwtInstance.sign(data, secret, {
        expiresIn: 10000,
      });
      return token;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
