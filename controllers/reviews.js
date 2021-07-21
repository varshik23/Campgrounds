const Campground = require('../models/campgrounds');
const Review = require('../models/reviews');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();
    camp.reviews.push(review);
    await camp.save();
    req.flash('success', 'Successfully Added New Review')
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully Deleted Review')
    res.redirect(`/campgrounds/${id}`)
}