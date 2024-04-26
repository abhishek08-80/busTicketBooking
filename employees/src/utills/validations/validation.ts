import joi from 'joi';

export const user = joi.object({
  firstName: joi.string().required().min(3).max(35),
  lastName: joi.string().required().min(3).max(35),
  Dob: joi.date().optional(),
  email: joi.string().email().required(),
  password: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
  phoneNo: joi.string().optional().length(10).pattern(/[6-9]{1}[0-9]{9}/),
  address: joi.string().required(),
  role: joi.string().optional(),
});

export const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const update = joi.object({
  firstName: joi.string().optional().min(3).max(35),
  lastName: joi.string().optional().min(3).max(35),
  Dob: joi.date().optional(),
  email: joi.string().email().optional(),
  phoneNo: joi.string().optional().length(10).pattern(/[6-9]{1}[0-9]{9}/),
  address: joi.string().optional(),
});


export const updatePassword = joi.object({
  email: joi.string().email().required(),
  oldPassword: joi.string().required(),
  newPassword: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
  confirmPassword: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
});

export const resetPassword = joi.object({
  email: joi.string().email().required(),
  newPassword: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
  confirmPassword: joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'password'),
});

export const resetPasswordEmail = joi.object({
  email: joi.string().email().required(),
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
