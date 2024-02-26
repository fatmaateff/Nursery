exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("You are not authorized to access this route");
    error.status = 401;
    next(error);
  }
  next();
};

exports.isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher") {
    const error = new Error("You are not authorized to access this route");
    error.status = 401;
    next(error);
  }
  next();
};
exports.isAdminOrTeacher = (req, res, next) => {
  if (req.user.role !== "teacher" && req.user.role !== "admin") {
    const error = new Error("You are not authorized to access this route");
    error.status = 401;
    next(error);
  }
  next();
};
