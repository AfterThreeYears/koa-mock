
const mongoose = require('mongoose');
// const passport = require('koa-passport');
const config = require('../config');
const koajwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const compose = require('koa-compose');
const User = mongoose.model('User');

/** 
 * 验证token
 */
function authToken() {
  return compose([
    async (ctx, next) => {
      if (ctx.cookies && ctx.cookies.get('koa_mock')) {
        ctx.headers.authorization = `Bearer ${ctx.cookies.get('koa_mock')}`;
      }
      await next();
    },
    koajwt({secret: config.session.secrets, passthrough: true}),
  ]);
}
/**
 * 验证用户是否登录
 */
function isAuthenticated() {
  return compose([
    authToken(),
    async (ctx, next) => {
      if (!ctx.state.user) return ctx.body = {errorMsg: '过期了', success: false};
      await next();
    },
    async (ctx, next) => {
      const user = await User.findById(ctx.state.user._id);
      if (!user) return ctx.body = {errorMsg: '没有该用户', success: false};
      ctx.req.user = user;
      await next();
    },
  ]);
}

/**
 * 生成token
 */
function signToken(id) {
  return jwt.sign(
    {_id: id},
    config.session.secrets,
    {expiresIn: config.session.cookie.maxAge / 1000}
  );
}

/**
 * sns登录传递参数
 */
// function snsPassport() {
//   return compose([
//       authToken(),
//       async (ctx,next) =>{
//         ctx.session.passport = {
//           redirectUrl: ctx.query.redirectUrl || '/'
//         }
//         if(ctx.state.user) { 
//           ctx.session.passport.userId = ctx.state.user._id 
//         }
//         await next()
//       }
//     ])
// }

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
// exports.snsPassport = snsPassport;
