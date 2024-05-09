import { validateRequest, user, update, login, resetPassword, resetPasswordEmail, updatePassword } from '../utills/validations/validation';
import employeeController from '../controller/employeeController';
import limiter from '../utills/middleware/rateLimiter';
import auth from '../utills/middleware/verifyToken';
import express from 'express'
const router = express.Router()

router.post('/',validateRequest(user),limiter,employeeController.createEmployee);
router.put('/:id',validateRequest(update),auth,limiter,employeeController.updateEmployee);
router.delete('/:id',auth,limiter,employeeController.deleteEmployee);
router.get('/',limiter,employeeController.getEmployee);
router.get('/getById',limiter,employeeController.getEmployeeById);
router.post('/login',validateRequest(login),limiter,employeeController.loginEmployee);
router.patch('/updatePassword/:id',auth,validateRequest(updatePassword),limiter,employeeController.changePassword);
router.post('/resetPasswordEmail',validateRequest(resetPasswordEmail),limiter,employeeController.resetPasswordEmail);
router.post('/resetPassword',validateRequest(resetPassword),limiter,employeeController.resetPassword);


export default router




// class allEmployeeRoutes{
//   route = Router();
//   public employeeRoute =new employeeController();
//   constructor(){
//     this.initializeRoutes();
//   }
//   initializeRoutes(){
//     this.route.post('/',validateRequest(user),limiter,this.employeeRoute.createEmployee);
//     this.route.put('/:id',validateRequest(update),auth,limiter,this.employeeRoute.updateEmployee);
//     this.route.delete('/:id',auth,limiter,this.employeeRoute.deleteEmployee);
//     this.route.get('/',limiter,this.employeeRoute.getEmployee);
//     this.route.get('/getById',limiter,this.employeeRoute.getEmployeeById);

//     this.route.post('/login',validateRequest(login),limiter,this.employeeRoute.loginEmployee);

//     this.route.patch('/updatePassword/:id',auth,validateRequest(updatePassword),limiter,this.employeeRoute.changePassword);

//     this.route.post('/resetPasswordEmail',validateRequest(resetPasswordEmail),limiter,this.employeeRoute.resetPasswordEmail);
    
//     this.route.post('/resetPassword',validateRequest(resetPassword),limiter,this.employeeRoute.resetPassword);
//   }
// }