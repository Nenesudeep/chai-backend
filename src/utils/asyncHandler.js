const asyncHandler = (requestHandler) => {
  return (req, res, next) => { // return the func
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
export {asyncHandler}