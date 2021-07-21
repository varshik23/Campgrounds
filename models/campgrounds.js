const { string } = require('joi')
const mongoose = require('mongoose')
const Review = require('./reviews')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    url: String,
    filename: String
})

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [imageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

campgroundSchema.virtual('properties.popUpText').get(function () {
    return `
    <strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong>
    <p>${this.description.substring(0, 170)}</p>`
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)