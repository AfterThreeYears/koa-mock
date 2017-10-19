const router = require('koa-router')();
const {
  create,
} = require('../controllers/interfaces.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/create', isAuthenticated(), create);

module.exports = router;
