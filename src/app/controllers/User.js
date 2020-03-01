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
    const {
      name,
      githubUsername,
      email,
      biography,
      avatar,
      siteBlog,
      githubUrl
    } = user;

    return res.json({
      name,
      githubUsername,
      email,
      biography,
      avatar,
      siteBlog,
      githubUrl
    });
  }

  async store(req, res) {
    const { name, githubUsername, email, password } = req.body;

    if (!name || !githubUsername || !email || !password) {
      return res.status(400).json({
        code: 400,
        error: "Verifique os campos obrigatórios!"
      });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({
        code: 409,
        error: "Este email já esta cadastrado!"
      });
    }

    if (await User.findOne({ githubUsername })) {
      return res.status(409).json({
        code: 409,
        error: "Este usuário já existe!"
      });
    }

    try {
      const githubResponse = await axios.get(
        `https://api.github.com/users/${githubUsername}`
      );

      if (githubResponse.status === 200) {
        const githubProperties = {
          biography: githubResponse.data.bio || "",
          avatar: req.body.avatar || githubResponse.data.avatar_url,
          siteBlog: githubResponse.data.blog || "",
          githubUrl: githubResponse.data.html_url
        };

        const user = await User.create({
          name,
          email,
          password,
          githubUsername,
          ...githubProperties
        });

        return res.status(200).json({
          code: 200,
          user
        });
      }
    } catch (err) {
      return res.status(400).json({
        code: 400,
        error: err.message
      });
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
