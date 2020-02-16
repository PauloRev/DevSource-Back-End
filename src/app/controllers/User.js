const axios = require("axios");
const User = require("../models/User");

class UserController {
  async index(req, res) {
    const users = await User.find().sort("-createdAt");
    return res.json({
      success: true,
      users
    });
  }

  async show(req, res) {
    const user = await User.findById(req.params.id);
    const { name, email, biography, avatar, siteBlog, github } = user;

    return res.json({
      name,
      email,
      biography,
      avatar,
      siteBlog,
      github
    });
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.json({ error: "Este email já esta cadastrado!" });
    }

    if (await User.findOne({ name })) {
      return res.json({ error: "Este usuário já existe!" });
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${name}`);

      const {
        avatar_url: avatar,
        bio: biography,
        blog: siteBlog,
        html_url: github
      } = response.data;

      const user = await User.create({
        name,
        email,
        password,
        biography,
        avatar,
        siteBlog,
        github
      });
      return res.json(user);
    } catch (err) {
      console.log(err, " ERROR");
    }
  }
  async destroy(req, res) {
    await User.findByIdAndDelete(req.params.id);

    return res.json({
      success: true
    });
  }
}

module.exports = new UserController();
