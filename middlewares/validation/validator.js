const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  let result = validationResult(req); //el validation gwa el req hena fa law fe ay errors htkon gowaah
  console.log(result);

  if (!result.errors.length >= 1) {
    let errorMessage = result.errors.reduce(
      //reduce bt7ot el current be zero intiallization w b3den btzwd 3leeh kol mara
      (current, error) => current + error.msg + ""
    );
    let error = new Error(errorMessage);
    error.statusCode = 422;
    next(error);
  } else {
    next();
  }
};
