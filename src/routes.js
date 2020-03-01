const express = require("express");
const router = express.Router();

const UserController = require("./app/controllers/User");
const SessionController = require("./app/controllers/Session");
const BookController = require("./app/controllers/Book");
const CourseController = require("./app/controllers/Course");
const GroupController = require("./app/controllers/Group");
const LikeBookController = require("./app/controllers/LikeBook");
const LikeCourseController = require("./app/controllers/LikeCourse");

const AuthMiddleware = require("./app/middlewares/Auth");

router.post("/v1/users", UserController.store);
router.post("/v1/sessions", SessionController.store);

// teste
router.delete("/v1/users/:id", UserController.destroy);

router.use(AuthMiddleware);

router.get("/v1/users", UserController.index);
router.get("/v1/users/:id", UserController.show);

// Books authenticated
router.get("/v1/books", BookController.index);
router.get("/v1/books/:id", BookController.show);
router.post("/v1/books", BookController.store);
router.put("/v1/books/:id", BookController.update);
router.delete("/v1/books/:id", BookController.destroy);

// Courses authenticated
router.get("/v1/courses", CourseController.index);
router.get("/v1/courses/:id", CourseController.show);
router.post("/v1/courses", CourseController.store);
router.put("/v1/courses/:id", CourseController.update);
router.delete("/v1/courses/:id", CourseController.destroy);

// Groups authenticated
router.get("/v1/groups", GroupController.index);
router.post("/v1/groups", GroupController.store);
router.put("/v1/groups/:id", GroupController.update);
router.delete("/v1/groups/:id", GroupController.destroy);

// Likes authenticated
router.post("/v1/books/likes/:id", LikeBookController.store);
router.post("/v1/courses/likes/:id", LikeCourseController.store);

module.exports = router;
