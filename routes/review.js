const express = require('express');
const router = express.Router({ mergeParams: true });

const reviews = require('../controllers/reviews')

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync')

const { validateReview, isLoggedIn, isDeleteLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isDeleteLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;