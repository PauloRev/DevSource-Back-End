const Book = require("../models/Book");

class LikesBookController {
  async store(req, res) {
    const book = await Book.findById(req.params.id);

    book.set({ likes: book.likes + 1 });

    await book.save();

    req.io.emit("likeBook", book);

    return res.status(200).json(book);
  }
}

module.exports = new LikesBookController();
