const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    //shof el header kda law 3ndo authorization attribute a3mlo split
    let token = req.get("Authorization")?.split(" ")[1];
    // law la2eto 3yza arg3o b2aa ba verify el token
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    error.message = "Not authenticated";
    error.statusCode = 403;
    next(error);
  }
};
