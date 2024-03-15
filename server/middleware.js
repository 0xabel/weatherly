// errorHandler.js

export const limit = (err, req, res, next) => {
  if (err.type === "entity.too.large") {
    res.status(413).json({
      success: false,
      message: "Request Entity Too Large :: LIMIT is 100 bytes",
    }); // Send the error message to the client
  } else {
    next(err); // If the error is not a body-parser error, pass it to the next middleware
  }
};
