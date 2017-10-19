const router = require('koa-router')();
const {
  create,
  update,
  alllist,
  getOne,
  addMembers,
  remove,
} = require('../controllers/projects.controller');
const {isAuthenticated} = require('../auth/auth.service');

router.post('/create', isAuthenticated(), create);

router.post('/update', isAuthenticated(), update);

router.get('/alllist', isAuthenticated(), alllist);

router.get('/:id', isAuthenticated(), getOne);

router.post('/addmembers', isAuthenticated(), addMembers);

router.post('/remove', isAuthenticated(), remove);

module.exports = router;
