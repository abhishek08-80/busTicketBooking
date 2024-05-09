export const message = {
  somethingWrong: 'Something went wrong',
  tokenRequried: 'Auth token is requried.',
  tokenExpired: 'Session expired, please login again.',
  login: 'Login successfully',
  validationError: 'Validation error. Please check your params and try again.',
  invalidlogin: 'Invalid login credentials. Please check and try again.',
  invalidRequest: 'Invalid request. Please check and try again.',
  otpExpired: 'OTP Expired, Please generate new OTP',
  inValidToken: 'Invalid token',


  add: (labal: string) => {
    return `${labal} added successfully.`;
  },
  sent: (labal: string) => {
    return `${labal} sent successfully.`;
  },
  fetch: (labal: string) => {
    return `${labal} fetched successfully.`;
  },
  update: (labal: string) => {
    return `${labal} updated successfully.`;
  },
  delete: (labal: string) => {
    return `${labal} deleted successfully.`;
  },
  notExist: (labal: string) => {
    return `${labal} not exist.`;
  },
  alreadyExist: (labal: string) => {
    return `${labal} already exist.`;
  },
  errorLog: (functionName: string, controllerName: string, err) => {
    return `${functionName} ${controllerName} Error @ ${err}`;
  },
};

export const statusCode = {
  success: 200,
  badRequest: 400,
  serverError: 501,
  forbidden: 203,
  notFound: 204,
  notAllowed: 205,
  tokenExpired: 401,
  emailOrUserExist: 207,
  wrongPassword: 208,
  accountDeactivated: 209,
  authTokenRequired: 499,
  unauthorized: 403,
};
