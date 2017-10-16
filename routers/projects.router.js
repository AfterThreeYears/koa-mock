const router = require('koa-router')();
const {
  create,
  update,
  alllist,
  getOne,
} = require('../controllers/projects.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/create', isAuthenticated(), create);

router.post('/update', isAuthenticated(), update);

router.get('/alllist', isAuthenticated(), alllist);

router.get('/:id', isAuthenticated(), getOne);

module.exports = router;
