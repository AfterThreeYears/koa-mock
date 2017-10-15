const router = require('koa-router')();
const {
  registered,
  checkLogin,
  update,
  userinfo,
} = require('../controllers/users.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/registered', registered);
router.get('/checkLogin', isAuthenticated(), checkLogin);
router.post('/update', isAuthenticated(), update);
router.get('/userinfo', isAuthenticated(), userinfo);

module.exports = router;
