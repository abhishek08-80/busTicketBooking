import { validateRequest, user, update, login, resetPassword, resetPasswordEmail, updatePassword } from '../utills/validations/validation';
import customerController from '../controller/customerControllers';
import limiter from '../utills/middleware/rateLimiter';
import auth from '../utills/middleware/verifyToken';
import express from 'express'
const router = express.Router()

router.post('/', validateRequest(user), limiter, customerController.createCustomer);
router.post('/login', validateRequest(login), limiter, customerController.loginCustomer);
router.put('/:id', validateRequest(update), auth, limiter, customerController.updateCustomer);
router.delete('/:id', auth, limiter, customerController.deleteCustomer);
router.get('/', limiter, customerController.getCustomer);
router.get('/getById', limiter, customerController.getCustomerById);
router.patch('/updatePassword/:id', auth, validateRequest(updatePassword), limiter, customerController.changePassword);
router.post('/resetPasswordEmail', validateRequest(resetPasswordEmail), limiter, customerController.resetPasswordEmail);
router.post('/resetPassword', validateRequest(resetPassword), limiter, customerController.resetPassword);


export default router;
