const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../errors/bad-request-error');

const handleCelebrateError = (err, req, res, next) => {
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const errorHeaders = err.details.get('headers'); // 'details' is a Map()
  const errorParams = err.details.get('params');
  const errorBody = err.details.get('body');
  const errorQuery = err.details.get('query');

  // TODO -- подумать, как привести расположенное ниже в приличный вид
  let message;
  if (errorHeaders) {
    const { details: [errorDetails] } = errorHeaders;
    message = errorDetails.message;
  } else if (errorParams) {
    const { details: [errorDetails] } = errorParams;
    message = errorDetails.message;
  } else if (errorBody) {
    const { details: [errorDetails] } = errorBody;
    message = errorDetails.message;
  } else if (errorQuery) {
    const { details: [errorDetails] } = errorQuery;
    message = errorDetails.message;
  }
  throw new BadRequestError(message);
};

module.exports = {
  handleCelebrateError,
};
