import { validateRequest, user, update, login, resetPassword, resetPasswordEmail, updatePassword } from '../utills/validations/validation';
import customerController from '../controller/customer';
import { Router } from 'express';


class allCustomerRoutes{
  route = Router();
  public customerRoute =new customerController();
  constructor(){
    this.initializeRoutes();
  }
  initializeRoutes(){
    this.route.post('/',validateRequest(user),this.customerRoute.createCustomer);

    this.route.put('/:id',validateRequest(update),this.customerRoute.updateCustomer);

    this.route.delete('/:id',this.customerRoute.deleteCustomer);

    this.route.get('/',this.customerRoute.getCustomer);

    this.route.post('/login',validateRequest(login),this.customerRoute.loginCustomer);

    this.route.patch('/updatePassword/:id',validateRequest(updatePassword),this.customerRoute.updateCustomer);

    this.route.post('/resetPasswordEmail',validateRequest(resetPasswordEmail),this.customerRoute.resetPasswordEmail);

    this.route.patch('/resetPassword',validateRequest(resetPassword),this.customerRoute.resetPassword);

  }
}

export default new allCustomerRoutes().route;
