const env = process.env.NODE_ENV || 'development';
module.exports = require(`./env/${process.env.NODE_ENV}.config.js`);