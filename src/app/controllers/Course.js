const Course = require("../models/Course");

class CourseController {
  async index(req, res) {
    const courses = await Course.find().sort("-createdAt");
    return res.json(courses);
  }

  async store(req, res) {
    const { id, name, email } = req.userSession;

    const course = await Course.create({
      ...req.body,
      author: id,
      authorName: name
    });
    return res.json(course);
  }

  async update(req, res) {
    const { id } = req.userSession;

    const { author } = await Course.findById(req.params.id);

    if (id != author) {
      return res.json({
        success: false,
        error: "você não criou esse post!"
      });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json({
      success: true,
      book
    });
  }

  async destroy(req, res) {
    const { id } = req.userSession;

    const { author } = await Course.findById(req.params.id);

    if (id != author) {
      return res.json({
        success: false,
        error: "você não criou esse post!"
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    return res.json({
      success: true
    });
  }
}

module.exports = new CourseController();
