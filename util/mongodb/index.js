const mongoose = require('mongoose');
const config = require('../../config');
mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.Promise = global.Promise;
module.exports = mongoose
