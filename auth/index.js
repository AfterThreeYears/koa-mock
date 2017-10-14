const router = require('koa-router')();
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const config = require('../config');

require('./local/passport').setup(User);

router.use('/local/passport', require('./local').routes());

module.exports = router;
