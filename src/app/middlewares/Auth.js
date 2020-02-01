const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

async function AuthMiddleware(req, res, next) {
  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token;

  if (token) {
    try {
      const payload = jwt.verify(token, authConfig.secret);
      req.userSession = payload;
      return next();
    } catch (err) {
      return res.json({
        success: false,
        error: "token inválido!"
      });
    }
  } else {
    return res.json({
      success: false,
      error: "token inexistente!"
    });
  }
}

module.exports = AuthMiddleware;
