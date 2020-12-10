const mongoose = require('mongoose');

const TEST_ENV = process.env.NODE_ENV === 'test';
const URL_TEST = process.env.MONGODB_URI_TEST;
const URL = process.env.MONGODB_URI;
const MONGODB_URI = TEST_ENV ? URL_TEST : URL;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;