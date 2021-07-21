const mongoose = require('mongoose');
const campgrounds = require('../models/campgrounds');
const cities = require('./cities');
const { places, descriptors } = require('./seed-helper');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDb')
});



const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDb = async () => {
    await campgrounds.deleteMany({});
    for (i = 0; i < 300; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campgrounds({
            author: '60f2ebdb15bfcb230893e7d8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djbqqlklb/image/upload/v1626682527/YelpCamp/co5hjzvmk3sjo4kqwbyi.jpg',
                    filename: 'YelpCamp/co5hjzvmk3sjo4kqwbyi'
                },
                {
                    url: 'https://res.cloudinary.com/djbqqlklb/image/upload/v1626781699/YelpCamp/wcqnjjiktxwnnifwx7ot.jpg',
                    filename: 'YelpCamp/wcqnjjiktxwnnifwx7ot'
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})