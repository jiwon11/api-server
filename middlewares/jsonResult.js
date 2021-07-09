export default (req, res, next) => {
  res.jsonResult = function (statusCode, message, data) {
    return res.status(statusCode).json({
      statusCode,
      body: {
        message,
        data
      }
    });
  };
  next();
};
