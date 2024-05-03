export const errorHandler = (res, code, message) => {
  res.status(code).json({
    ok: false,
    message: message,
  });
};
