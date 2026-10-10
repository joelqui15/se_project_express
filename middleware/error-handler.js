const errorHandler = (err, req, res, next) => {
  //centralized error handling
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500
        ? "Internal server error, please try again later"
        : message,
  });
};

module.exports = errorHandler;
