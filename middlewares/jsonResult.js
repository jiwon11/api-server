export default (req, res, next) => {
  res.jsonResult = function (statusCode, body) {
    let data;
    let message;
    if (typeof body === 'string') {
      message = body;
    } else if (typeof body === 'object') {
      data = body;
    }
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
