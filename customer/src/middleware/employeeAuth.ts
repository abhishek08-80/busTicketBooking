import { Request, Response, NextFunction } from 'express'
// import { TOKEN_KEY } from "../config/dbConfig";
import jwt from 'jsonwebtoken'
import { Requests, Decode } from '../utills/interface/interface'
import { TOKEN_KEY } from '../../env'

function authEmployee(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req?.headers?.['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader?.split(' ')
    const token = bearer?.[1]
    if (token) {
      jwt.verify(token, TOKEN_KEY as any, function (err: any, decoded: any) {
        if (err) {
          return res.status(500).send({ auth: false, message: err })
        }
        const reqObj: Requests = {} as Requests
        const decodedObj: Decode = {} as Decode

        reqObj.email = decoded.email
        console.log(decoded.role)
        // Check if the role is 'admin'
        if (decoded.role == 'Admin') {
          // If the role is 'admin', proceed with the next middleware
          next()
        } else {
          // If the role is not 'admin', deny access
          return res.status(403).json({
            message: 'Access denied, Only admin can access this route.',
          })
        }
      })
    } else {
      // Access Denied
      return res.status(401).json({ message: 'Invalid token' })
    }
  } else {
    // Access Denied
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default authEmployee
