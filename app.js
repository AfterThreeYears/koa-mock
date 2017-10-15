const Koa = require('koa');
const app = new Koa();
require('./util/mongodb');
require('./config/middleware')(app);
require('./routes')(app);

module.exports = app;
