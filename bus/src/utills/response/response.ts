export const successResponse = (
  statusCode: number,
  data: {},
  message = 'Success',
) => {
  return { statusCode, data, message };
};

export const failResponse = (
  statusCode: number,
  errorMessage: string,
  message = 'Fail',
) => {
  return { statusCode, errorMessage, message };
};
