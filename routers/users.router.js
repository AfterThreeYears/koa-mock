const router = require('koa-router')();
const {
  registered,
  checkLogin,
} = require('../controllers/users.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/registered', registered);
router.get('/checkLogin', isAuthenticated(), checkLogin);

module.exports = router;
