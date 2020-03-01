const Book = require("../models/Book");

class BookController {
  async index(req, res) {
    const books = await Book.find().sort("-createdAt");
    return res.json(books);
  }

  async show(req, res) {
    const book = await Book.findById(req.params.id);

    return res.status(200).json(book);
  }

  async store(req, res) {
    const { id, name, email } = req.userSession;

    const book = await Book.create({
      ...req.body,
      author: id,
      authorName: name
    });

    req.io.emit("book", book);

    return res.json(book);
  }

  async update(req, res) {
    const { id } = req.userSession;

    const { author } = await Book.findById(req.params.id);

    if (id != author) {
      return res.json({
        success: false,
        error: "você não criou esse post!"
      });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json({
      success: true,
      book
    });
  }

  async destroy(req, res) {
    const { id } = req.userSession;

    const { author } = await Book.findById(req.params.id);

    if (id != author) {
      return res.json({
        success: false,
        error: "você não criou esse post!"
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    return res.json({
      success: true
    });
  }
}

module.exports = new BookController();
