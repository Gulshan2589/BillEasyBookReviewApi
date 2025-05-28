const express = require("express");
const router = express.Router();
const  verifyUser  = require("../middlewares/auth.middleware");
const {
  addBook,
  getBookById,
  getBooks,
  bookSerach
} = require("../controllers/book.controller");

router.post("/books",verifyUser, addBook); 
router.get("/books", getBooks); 
router.get("/books/:id", getBookById); 
router.get("/search", bookSerach); 

module.exports = router;
