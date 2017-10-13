const Koa = require('koa');
const app = new Koa();
const router = require('./routes')(app);

module.exports = app;