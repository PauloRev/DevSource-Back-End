const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth");

const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const user = req.body;

    const userDb = await User.findOne({ email: user.email });

    const isValid = await userDb.checkPassword(user.password);

    if (isValid === true) {
      const payload = {
        id: userDb._id,
        name: userDb.name,
        email: userDb.email
      };

      jwt.sign(payload, authConfig.secret, (err, token) => {
        if (err) {
          return res.json({
            success: false,
            error: "token inválido!"
          });
        } else {
          return res.json({
            success: true,
            token: token
          });
        }
      });
    } else {
      return res.json({
        success: false,
        error: "e-mail ou senha incorretos!"
      });
    }
  }
}

module.exports = new SessionController();
