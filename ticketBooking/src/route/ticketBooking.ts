import { validateRequest, user, update } from '../utills/validations/validation';
import ticketBookingController from '../controller/ticketBooking';
import limiter from '../utills/middleware/rateLimiter';
import auth from '../utills/middleware/verifyToken';
import express from 'express';
const router = express.Router();

router.post('/',validateRequest(user),limiter,ticketBookingController.createTicket);
router.put('/:id',validateRequest(update),auth,limiter,ticketBookingController.updateTicket);
router.delete('/:id',auth,limiter,ticketBookingController.deleteTicket);
router.get('/',limiter,ticketBookingController.getTicket);
router.get('/getById',limiter,ticketBookingController.getTicketById);
export default router;
