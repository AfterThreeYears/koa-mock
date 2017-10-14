const Router = require('koa-router');
const router = new Router();
const users = require('./routers/users.router.js');
const auth = require('./auth');


module.exports = (app) => {
  router.use('/users', users.routes());
  router.use('/auth', auth.routes());
  app.use(router.routes());
  app.use(router.allowedMethods());
};
