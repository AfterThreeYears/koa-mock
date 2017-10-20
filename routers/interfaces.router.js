const router = require('koa-router')();
const {
  create,
  update,
  remove,
  alllist,
  detail,
  mock,
} = require('../controllers/interfaces.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/create', isAuthenticated(), create);
router.post('/update', isAuthenticated(), update);
router.post('/remove', isAuthenticated(), remove);
router.get('/alllist', isAuthenticated(), alllist);
router.get('/detail', isAuthenticated(), detail);
router.use('/:projectId', isAuthenticated(), mock);

module.exports = router;
