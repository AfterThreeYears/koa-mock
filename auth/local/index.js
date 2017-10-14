const router = require('koa-router')();
const passport = require('koa-passport');
const auth = require('../auth.service');
const config = require('../../config');

const checkCaptcha = () => {
  return async (ctx, next) => {
    // TODO 验证码
    await next();
  };
};

router.post('/', checkCaptcha(), async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) ctx.throw(err);
    if (info) {
      return ctx.body = info;
    }
    const token = auth.signToken(user._id);
    ctx.cookies.set('koa_mock', token, {
      path: '/',
      maxAge: config.session.cookie.maxAge,
      httpOnly: true,
    });
    ctx.body = {success: true, token};
  })(ctx, next);
});

module.exports = router;
