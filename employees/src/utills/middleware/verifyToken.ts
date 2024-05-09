import { ITokenDetail } from '../../../../employees/src/utills/interface/interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import dotenv from 'dotenv';
import logger from '../logger/logger'
import { statusCode, message } from '../response/constrant';
import { successResponse, failResponse } from '../response/response';
dotenv.config()


export const extractBearerToken = (headers?: IncomingHttpHeaders): string | undefined => {
  let token;
  if (headers) {
    const rawAuthorization = headers.authorization;
    if (
      rawAuthorization &&
      typeof rawAuthorization === 'string' &&
      rawAuthorization.startsWith('Bearer ')
    ) {
      token = rawAuthorization.split('Bearer ')[1];
    }
  }
  return token;
};

// Define type for req.headers
interface CustomRequest {
  headers?: IncomingHttpHeaders; // Use IncomingHttpHeaders type for headers
  user?: ITokenDetail;
  authorization?: string;
}

export default async function authenticate(
  req: CustomRequest, // Use CustomRequest type
  res: Response,
  next: () => void,
) {

  try {
    const token = extractBearerToken(req?.headers);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', code: 401 });
    }
    const decode = jwt.verify(token, process.env.TOKEN_KEY) as JwtPayload;
    req.user = {
      id: decode?.id as string, // Safely access 'id' property
      email: decode?.email,
    };
    return next();
  } catch (err) {
    logger.error(message.errorLog('authMiddleware', 'authMiddleware',err));
     res
   .status(statusCode.unauthorized)
   .json(
     failResponse(
       statusCode.badRequest,
       err.message,
       message.inValidToken,
     ),
   );
 }
}
