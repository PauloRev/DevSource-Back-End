const Course = require("../models/Course");

class LikesCourseController {
  async store(req, res) {
    const course = await Course.findById(req.params.id);

    course.set({ likes: course.likes + 1 });

    await course.save();

    req.io.emit("likeCourse", course);

    return res.status(200).json(course);
  }
}

module.exports = new LikesCourseController();
