const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rating: Number,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('Review', reviewSchema);