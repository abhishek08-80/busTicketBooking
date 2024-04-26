import { Request, Response, NextFunction } from 'express';
import { TOKEN_KEY } from '../../env';
import jwt from 'jsonwebtoken';
import { Decode, Requests } from '../utills/interface/interface';

function auth(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req?.headers?.['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader?.split(' ');
    const token = bearer?.[1];
    if (token) {
      jwt.verify(token, TOKEN_KEY as any, function (err: any, decoded: any) {
        if (err) {
          return res.status(500).send({ auth: false, message: err });
        }
        const reqObj: Requests = {} as Requests;
        const decodedObj: Decode = {} as Decode;

        // reqObj._id = decoded._id;
        reqObj.email = decoded.email;
        next();
      });
    } else {
      // Access Denied
      return res.status(401).json({ message: 'invalid token' });
    }
  } else {
    // Access Denied
    return res.status(401).json({ message: 'invalid token' });
  }
}

export default auth;
