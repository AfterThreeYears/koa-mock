const router = require('koa-router')();
const {
    index,
    test,
} = require('../controllers/users.controller');

router.get('/', index);

router.get('/test', test);


module.exports = router;
