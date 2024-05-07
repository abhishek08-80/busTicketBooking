import { validateRequest, user, update, login, resetPassword, resetPasswordEmail, updatePassword } from '../utills/validations/validation';
import customerController from '../controller/customer';
import { Router } from 'express';
import limiter from '../utills/middleware/rateLimiter';
import auth from '../utills/middleware/verifyToken';

class allCustomerRoutes {
  route = Router();
  public customerRoute = new customerController();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.route.post('/', validateRequest(user), limiter, this.customerRoute.createCustomer);

    this.route.put('/:id', validateRequest(update), limiter, this.customerRoute.updateCustomer);

    this.route.delete('/:id', limiter, this.customerRoute.deleteCustomer);
    
    this.route.post('/login', validateRequest(login), limiter, this.customerRoute.loginCustomer);
    
    this.route.get('/', this.customerRoute.getCustomer);

    this.route.patch('/updatePassword/:id', validateRequest(updatePassword), limiter, this.customerRoute.updateCustomer);

    this.route.post('/resetPasswordEmail', validateRequest(resetPasswordEmail), limiter, this.customerRoute.resetPasswordEmail);

    this.route.patch('/resetPassword', validateRequest(resetPassword), limiter, this.customerRoute.resetPassword);

  }
}

export default new allCustomerRoutes().route;
