const Router = require('koa-router');
const router = new Router();
const users = require('./routers/users.router.js');
const projects = require('./routers/projects.router.js');
const interfaces = require('./routers/interfaces.router.js');
const auth = require('./auth');


module.exports = (app) => {
  router.use('/users', users.routes());
  router.use('/auth', auth.routes());
  router.use('/projects', projects.routes());
  router.use('/mock', interfaces.routes());
  app.use(router.routes());
  app.use(router.allowedMethods());
};
