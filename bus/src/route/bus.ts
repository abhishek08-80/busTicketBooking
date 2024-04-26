import { validateRequest, user, update } from '../utills/validations/validation';
import busController from '../controller/bus';
import { Router } from 'express';


class allCustomerRoutes{
  route = Router();
  public busRoute =new busController();
  constructor(){
    this.initializeRoutes();
  }
  initializeRoutes(){
    this.route.post('/',validateRequest(user),this.busRoute.createBus);

    this.route.put('/:id',validateRequest(update),this.busRoute.updateBus);

    this.route.delete('/:id',this.busRoute.deleteBus);

    this.route.get('/',this.busRoute.getBus);
  }
}

export default new allCustomerRoutes().route;
