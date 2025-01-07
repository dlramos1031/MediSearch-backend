const express = require('express');
const {
  getReviewsByHospital,
  addReview,
  deleteReview,
} = require('../controllers/reviewsController');

const router = express.Router();

router.get('/:hospitalId', getReviewsByHospital); // Fetch all reviews for a specific hospital
router.post('/', addReview); // Add a new review
router.delete('/:reviewId', deleteReview); // Delete a specific review

module.exports = router;
