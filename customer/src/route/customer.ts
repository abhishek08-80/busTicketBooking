import userController from '../controller/customer'
import validationMiddleware from '../utills/validations/validation'

const restaurantRoute = (app) => {
  app.post(
    '/createCustomer',
    validationMiddleware,
    userController.createCustomer,
  )
  app.put(
    '/updateCustomer/:id',
    validationMiddleware,
    userController.updateCustomer,
  )
  app.delete(
    '/delete/:id',
    validationMiddleware,
    userController.deleteCustomer)

  app.get(
    '/get', validationMiddleware,
    userController.getCustomer)

  app.post(
    '/login', validationMiddleware,
    userController.loginCustomer)

  app.patch(
    '/updatePassword/:id', validationMiddleware,
    userController.updateCustomer)

  app.post(
    '/resetPasswordEmail', validationMiddleware,
    userController.resetPasswordEmail)

  app.post(
    '/resetPassword', validationMiddleware,
    userController.resetPassword)
}
export default restaurantRoute
