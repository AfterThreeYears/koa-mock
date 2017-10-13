const Router = require('koa-router');
const router = new Router();
const users = require('./routers/users.router.js');
const api = require('./routers/api.router.js');

module.exports = (app) => {
  router.use('/test', users.routes());
  router.use('/api', api.routes());  

  app.use(router.routes());
  app.use(router.allowedMethods());
};