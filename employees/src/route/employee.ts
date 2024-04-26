import { validateRequest, user, update, login, resetPassword, resetPasswordEmail, updatePassword } from '../utills/validations/validation';
import employeeController from '../controller/employee';
import { Router } from 'express';


class allEmployeeRoutes{
  route = Router();
  public employeeRoute =new employeeController();
  constructor(){
    this.initializeRoutes();
  }
  initializeRoutes(){
    this.route.post('/',validateRequest(user),this.employeeRoute.createEmployee);

    this.route.put('/:id',validateRequest(update),this.employeeRoute.updateEmployee);

    this.route.delete('/:id',this.employeeRoute.deleteEmployee);

    this.route.get('/',this.employeeRoute.getEmployee);

    this.route.post('/login',validateRequest(login),this.employeeRoute.loginEmployee);

    this.route.patch('/updatePassword/:id',validateRequest(updatePassword),this.employeeRoute.changePassword);

    this.route.post('/resetPasswordEmail',validateRequest(resetPasswordEmail),this.employeeRoute.resetPasswordEmail);
    
    this.route.post('/resetPassword',validateRequest(resetPassword),this.employeeRoute.resetPassword);
  }
}

export default new allEmployeeRoutes().route;