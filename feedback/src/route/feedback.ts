import { validateRequest, user, update } from '../utills/validations/validation';
import feedbackController from '../controller/feedback';
import limiter from '../utills/middleware/rateLimiter';
import auth from '../utills/middleware/verifyToken';
import express from 'express';
const router = express.Router();

router.post('/',validateRequest(user),limiter,feedbackController.createFeedback);
router.put('/:id',validateRequest(update),auth,limiter,feedbackController.updateFeedback);
router.delete('/:id',auth,limiter,feedbackController.deleteFeedback);
router.get('/',limiter,feedbackController.getFeedback);
router.get('/getById',limiter,feedbackController.getFeedbackById);
export default router;
