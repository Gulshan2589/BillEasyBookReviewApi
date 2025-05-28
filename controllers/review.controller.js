const Review = require("../models/review.model");

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user._id;

    // Validate required fields
    if (!bookId || !rating || !comment) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({
        status: false,
        message: "You have already reviewed this book",
      });
    }

    // Create new review
    const review = new Review({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    await review.save();
    return res
      .status(201)
      .json({ status: true, message: "Review added successfully", review });
  } catch (error) {
    console.error("Error in adding review:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in adding review" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validate required fields
    if (!rating || !comment) {
      return res
        .status(400)
        .json({ status: false, message: "Rating and comment are required" });
    }

    // Find and update the review
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!review) {
      return res
        .status(404)
        .json({ status: false, message: "Review not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error in updating review:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in updating review" });
  }
};

const deleteReview = async (req, res) => {
  try {
    // Find and delete the review
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!review) {
      return res
        .status(404)
        .json({ status: false, message: "Review not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error in deleting review:", error.message);
    return res
      .status(500)
      .json({ status: false, message: "Error in deleting review" });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
};
