const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth");

const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const user = req.body;

    const userDb = await User.findOne({ email: user.email });

    if (!userDb) {
      return res.json({ error: "e-mail não existe!" });
    }

    if (!(await userDb.checkPassword(user.password))) {
      return res.json({ error: "senha incorreta!" });
    }

    try {
      const { id, name, email } = userDb;

      return res.json({
        success: true,
        token: jwt.sign({ id, name, email }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      });
    } catch (err) {
      console.log(err, " ERRO");
    }
  }
}

module.exports = new SessionController();
