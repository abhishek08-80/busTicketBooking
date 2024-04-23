import { Request, Response } from 'express'
import userService from '../services/customer'
import { successResponse, failResponse } from '../utills/response/response'
import { statusCode, message } from '../utills/response/constrant'
import logger from '../utills/logger/logger'

async function createEmployee(req: Request, res: Response) {
  try {
    const data = await userService.createEmployeeService(req.body)
    if (data == 'userAlreadyExist') {
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            data,
            message.alreadyExist('User'),
          ),
        )
    } else {
      res
        .status(statusCode.success)
        .json(successResponse(statusCode.success, data, message.add('User')))
    }
  } catch (err) {
    logger.error(message.errorLog('userAdd', 'userController', err))
    res
      .status(statusCode.badRequest)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function deleteEmployee(req: Request, res: Response) {
  try {
    const data = await userService.deleteEmployeeService(req.params)
    if (data == 'userDoesNotExist') {
      res
        .status(statusCode.badRequest)
        .json(
          successResponse(
            statusCode.badRequest,
            data,
            message.alreadyExist('User'),
          ),
        )
    } else {
      res
        .status(statusCode.success)
        .json(successResponse(statusCode.success, data, message.add('User')))
    }
  } catch (err) {
    logger.error(message.errorLog('userAdd', 'userController', err))
    res
      .status(statusCode.badRequest)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function updateEmployee(req: Request, res: Response) {
  try {
    const data = req.body
    const EmployeeId: string = req.params.id

    const customerData = await userService.changePasswordService(
      data,
      EmployeeId,
    )
    if (customerData == 'newPassword!=ConfirmPassword') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.notAllowed, data, message.invalidRequest))
    } else if (customerData == 'userDoesNotExists') {
      res
        .status(statusCode.notFound)
        .json(
          failResponse(
            statusCode.emailOrUserExist,
            data,
            message.notExist('User'),
          ),
        )
    } else if (customerData == 'oldPasswordIncorrect') {
      res
        .status(statusCode.badRequest)
        .json(
          failResponse(
            statusCode.badRequest,
            data,
            message.alreadyExist('Email'),
          ),
        )
    } else {
      res
        .status(statusCode.success)
        .json(successResponse(statusCode.success, data, message.update('User')))
    }
  } catch (err) {
    logger.error(message.errorLog('userUpdate', 'userController', err))
    res
      .status(statusCode.emailOrUserExist)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function changePassword(req: Request, res: Response) {
  try {
    const data = req.body
    const CustomerId: string = req.params.id

    const customerData = await userService.changePasswordService(
      data,
      CustomerId,
    )
    if (customerData == 'newPassword!=ConfirmPassword') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.notAllowed, data, message.invalidRequest))
    } else if (customerData == 'userDoesNotExists') {
      res
        .status(statusCode.notFound)
        .json(
          failResponse(
            statusCode.emailOrUserExist,
            data,
            message.notExist('User'),
          ),
        )
    } else if (customerData == 'oldPasswordIncorrect') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.badRequest, data, message.invalidRequest))
    } else {
      res
        .status(statusCode.success)
        .json(
          successResponse(statusCode.success, data, message.update('Password')),
        )
    }
  } catch (err) {
    logger.error(message.errorLog('userUpdate', 'userController', err))
    res
      .status(statusCode.emailOrUserExist)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    const data = req.body

    const customerData = await userService.resetPasswordService(data)
    if (customerData == 'newPassword!== confirmPassword') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.notAllowed, data, message.invalidRequest))
    } else if (customerData == 'userDoesNotExists') {
      res
        .status(statusCode.notFound)
        .json(
          failResponse(
            statusCode.emailOrUserExist,
            data,
            message.notExist('User'),
          ),
        )
    } else if (customerData == 'incorrectOtp') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.badRequest, data, message.invalidRequest))
    } else if (customerData == 'otpExpired') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.badRequest, data, message.otpExpired))
    } else {
      res
        .status(statusCode.success)
        .json(
          successResponse(statusCode.success, data, message.update('Password')),
        )
    }
  } catch (err) {
    logger.error(message.errorLog('userUpdate', 'userController', err))
    res
      .status(statusCode.emailOrUserExist)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function resetPasswordEmail(req: Request, res: Response) {
  try {
    const data = req.body

    const customerData = await userService.resetPasswordEmailService(data)
    if (customerData == 'userDoesNotExists') {
      res
        .status(statusCode.badRequest)
        .json(failResponse(statusCode.notAllowed, data, message.invalidRequest))
    } else {
      res
        .status(statusCode.success)
        .json(successResponse(statusCode.success, data, message.sent('Otp')))
    }
  } catch (err) {
    logger.error(message.errorLog('userUpdate', 'userController', err))
    res
      .status(statusCode.emailOrUserExist)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function getEmployee(req: Request, res: Response) {
  try {
    const data = await userService.getAllService()
    if (data == 'userDoesNotExist') {
      res
        .status(statusCode.notFound)
        .json(
          failResponse(statusCode.badRequest, data, message.notExist('User')),
        )
    } else {
      res
        .status(statusCode.success)
        .json(successResponse(statusCode.success, data, message.fetch('User')))
    }
  } catch (err) {
    logger.error(message.errorLog('userAdd', 'userController', err))
    res
      .status(statusCode.badRequest)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

async function loginEmployee(req: Request, res: Response) {
  try {
    const data = await userService.loginEmployeeService(req.body)
    if (data == 'userDoesNotExist') {
      res
        .status(statusCode.notFound)
        .json(
          failResponse(statusCode.badRequest, data, message.notExist('User')),
        )
    } else if (data == 'incorrectPassword') {
      res
        .status(statusCode.wrongPassword)
        .json(failResponse(statusCode.badRequest, data, message.invalidlogin))
    } else {
      res
        .status(statusCode.success)
        .json(successResponse(statusCode.success, data, message.login))
    }
  } catch (err) {
    logger.error(message.errorLog('userAdd', 'userController', err))
    res
      .status(statusCode.badRequest)
      .json(
        failResponse(
          statusCode.badRequest,
          err.message,
          message.somethingWrong,
        ),
      )
  }
}

export default {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  loginEmployee,
  changePassword,
  resetPassword,
  resetPasswordEmail,
}
