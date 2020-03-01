const Group = require("../models/Group");

class GroupController {
  async index(req, res) {
    const groups = await Group.find().sort("-createdAt");
    return res.json(groups);
  }

  async store(req, res) {
    const { id, name, email } = req.userSession;

    const group = await Group.create({
      ...req.body,
      author: id,
      authorName: name
    });

    req.io.emit("group", group);

    return res.json(group);
  }

  async update(req, res) {
    const { id } = req.userSession;

    const { author } = await Group.findById(req.params.id);

    if (id != author) {
      return res.json({
        success: false,
        error: "você não criou esse post!"
      });
    }

    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json({
      success: true,
      group
    });
  }

  async destroy(req, res) {
    const { id } = req.userSession;

    const { author } = await Group.findById(req.params.id);

    if (id != author) {
      return res.json({
        success: false,
        error: "você não criou esse post!"
      });
    }

    await Group.findByIdAndDelete(req.params.id);

    return res.json({
      success: true
    });
  }
}

module.exports = new GroupController();
