const Book = require("../models/book.model.js");
const Review = require("../models/review.model.js");

const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    // Validate required fields
    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const book = new Book({ title, author, genre });
    await book.save();

    return res
      .status(201)
      .json({ status: true, message: "Book added successfully!", book });
  } catch (error) {
    console.error("Error in adding book:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in adding book" });
  }
};

const getBooks = async (req, res) => {
  try {
    const { author, genre } = req.query;
    const limit = parseInt(req.query.limit) || 10;//documents to be fetched per page
    const page = parseInt(req.query.page) || 1;//current page number
    const skip = (page - 1) * limit;//skip the documents of previous pages
    const filter = {};
    if (author) filter.author = { $regex: author, $options: "i" }; // Case-insensitive search
    if (genre) filter.genre = { $regex: `^${genre}`, $options: "i" };

    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .select("-__v -createdAt -updatedAt");
    const totalBooks = await Book.countDocuments(filter);
    const totalPages = Math.ceil(totalBooks / limit);
    return res
      .status(200)
      .json({ status: true, totalBooks, currentPage: page, totalPages, books });
  } catch (error) {
    console.error("Error in fetching books:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in fetching books" });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ status: false, message: "Book not found" });
    }
    const reviews = await Review.find({ book: book._id }).select('user rating comment').populate(
      "user",
      "username email"
    );
    let averageRating = 0;
    if (reviews.length > 0) {
      averageRating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
    }

    const bookWithReviews = {
      _id: book._id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      reviews: reviews,
      averageRating: averageRating.toFixed(2), // Format to 2 decimal places
    };

    return res.status(200).json({ status: true, bookWithReviews });
  } catch (error) {
    console.error("Error in fetching book by ID:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in fetching book" });
  }
};

const bookSerach = async (req, res) => {
  try {
    const { q } = req.query;
    const books = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ]
    }).select("-__v -createdAt -updatedAt");
    return res.status(200).json({ status: true, books });
  } catch (error) {
    console.error("Error in Seraching book", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in Seraching book" });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  bookSerach
};
