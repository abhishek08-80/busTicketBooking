import joi from 'joi'

const user = joi.object({
  name: joi.string().optional(),
  age: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().optional(),
  phoneNo: joi.string().optional(),
})

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})

const validationMiddleware = async (
  req: any,
  res: any,
  next: any,
  schema: string,
) => {
  const option = {
    abortEarly: false,
    allowUnknown: false,
  }

  if (schema == 'user') {
    var { error } = user.validate(req.body, option)
  }

  if (schema == 'login') {
    var { error } = login.validate(req.body, option)
  }

  if (error) {
    res.status(400).json({ validationError: error.details[0].message })
  } else {
    next()
  }
}

export default validationMiddleware
