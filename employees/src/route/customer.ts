import userController from '../controller/customer'
import validationMiddleware from '../utills/validations/validation'

const employeeRoute = (app) => {
  app.post(
    '/createEmployee',
    validationMiddleware,
    userController.createEmployee,
  )
  app.put(
    '/updateEmployee/:id',
    validationMiddleware,
    userController.updateEmployee,
  )
  app.delete(
    '/delete/:id',
    validationMiddleware,
    userController.deleteEmployee)

  app.get(
    '/get', validationMiddleware,
    userController.getEmployee)

  app.post(
    '/login', validationMiddleware,
    userController.loginEmployee)

  app.patch(
    '/updatePassword/:id', validationMiddleware,
    userController.updateEmployee)

  app.post(
    '/resetPasswordEmail', validationMiddleware,
    userController.resetPasswordEmail)

  app.post(
    '/resetPassword', validationMiddleware,
    userController.resetPassword)
}
export default employeeRoute
