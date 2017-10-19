const router = require('koa-router')();
const {
  registered,
  checkLogin,
  update,
  userinfo,
  userlist,
} = require('../controllers/users.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/registered', registered);
router.get('/checklogin', isAuthenticated(), checkLogin);
router.post('/update', isAuthenticated(), update);
router.get('/userinfo', isAuthenticated(), userinfo);
router.get('/userlist', isAuthenticated(), userlist);

module.exports = router;
