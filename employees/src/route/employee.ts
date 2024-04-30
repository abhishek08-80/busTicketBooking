import { validateRequest, user, update, login, resetPassword, resetPasswordEmail, updatePassword } from '../utills/validations/validation';
import employeeController from '../controller/employee';
import { Router } from 'express';
import limiter from '../utills/middleware/rateLimiter';
import auth from '../utills/middleware/verifyToken';


class allEmployeeRoutes{
  route = Router();
  public employeeRoute =new employeeController();
  constructor(){
    this.initializeRoutes();
  }
  initializeRoutes(){
    this.route.post('/',validateRequest(user),limiter,this.employeeRoute.createEmployee);

    this.route.put('/:id',validateRequest(update),auth,limiter,this.employeeRoute.updateEmployee);

    this.route.delete('/:id',auth,limiter,this.employeeRoute.deleteEmployee);

    this.route.get('/',limiter,this.employeeRoute.getEmployee);

    this.route.post('/login',validateRequest(login),limiter,this.employeeRoute.loginEmployee);

    this.route.patch('/updatePassword/:id',auth,validateRequest(updatePassword),limiter,this.employeeRoute.changePassword);

    this.route.post('/resetPasswordEmail',validateRequest(resetPasswordEmail),limiter,this.employeeRoute.resetPasswordEmail);
    
    this.route.post('/resetPassword',validateRequest(resetPassword),limiter,this.employeeRoute.resetPassword);
  }
}

export default new allEmployeeRoutes().route;