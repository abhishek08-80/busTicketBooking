import joi from 'joi';
import { places } from '../enums/enum';

export const createBus = joi.object({
  from: joi.string().valid(...Object.values(places)).required(),
  to: joi.string().valid(...Object.values(places)).required(),
  totalSeats: joi.number().required(),
  date: joi.date().iso().required(),
  time: joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
  employeeId: joi.string().required(),
  price: joi.number().required(),
});

export const deleteBus = joi.object({
  id: joi.string().required()
});

export const updateBus = joi.object({
  from: joi.string().valid(...Object.values(places)).optional(),
  to: joi.string().valid(...Object.values(places)).optional(),
  totalSeats: joi.number().optional(),
  date: joi.date().iso().optional(),
  time: joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).optional(),
  price: joi.number().optional(),
});

export const getBusById = joi.object({
  id: joi.string().required()
});

export const updatePassword = joi.object({
  email: joi.string().email().required(),
  oldPassword: joi.string().required(),
  newPassword: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
  confirmPassword: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
});



export const validateRequest = (schema) => {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};