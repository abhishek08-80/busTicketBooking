import { validateRequest, updateBus, createBus, deleteBus, getBusById } from '../utills/validations/validation';
import busController from '../controller/busController';
import { Router } from 'express';
import express from 'express'
import auth from '../utills/middleware/verifyToken'
const router = express.Router()

  // router.post('/',validateRequest(user),busController.createBus);
  router.post('/',validateRequest(createBus),auth,busController.createBus);
  router.put('/:id',validateRequest(updateBus),auth,busController.updateBus);
  router.delete('/:id',validateRequest(deleteBus),auth,busController.deleteBus);
  router.get('/',validateRequest,busController.getAllBus);
  router.get('/:id',validateRequest(getBusById),busController.getBusById);
  

  export default router
