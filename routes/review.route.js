const express = require("express");
const router = express.Router();
const  verifyUser  = require("../middlewares/auth.middleware");
const {
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router.post("/books/:id/reviews",verifyUser, addReview); // Add a review
router.put("/reviews/:id", verifyUser, updateReview); // Update a review
router.delete("/reviews/:id", verifyUser, deleteReview); // Delete a review

module.exports = router;
