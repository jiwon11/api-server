import httpStatus from 'http-status-codes';

exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  const result = {
    status: errorCode,
    body: {
      message: 'The page does not exist!'
    }
  };
  res.status(errorCode).json(result);
};

exports.respondInternalError = (errors, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`Error occured: ${errors.stack}`);
  const result = {
    status: errorCode,
    body: {
      message: 'The page does not exist!'
    }
  };
  res.status(errorCode).json(result);
};
