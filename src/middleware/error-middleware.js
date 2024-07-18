import responseError from "../error/error.js";

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof responseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else {
    res.status(500).json({
      errors: err.message,
    });
  }
};

export default errorMiddleware;
