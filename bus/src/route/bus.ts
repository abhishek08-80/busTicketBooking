import { validateRequest, user, update } from '../utills/validations/validation';
import busController from '../controller/bus';
import { Router } from 'express';
import express from 'express'

const router = express.Router()

  // router.post('/',validateRequest(user),busController.createBus);
  router.post('/',busController.createBus);
  router.put('/:id',validateRequest(update),busController.updateBus);
  router.delete('/:id',busController.deleteBus);
  router.get('/',busController.getBus);
  

  export default router
