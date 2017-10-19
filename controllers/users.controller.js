const User = require('../models/users.model');
const {errMsgFormat} = require('../util/tools');

const registered = async (ctx) => {
  const {username, password, email} = ctx.request.body;
  const newUser = new User({
    username,
    password,
    email,
  });
  try {
    await newUser.save();
    ctx.body = {
      success: true,
      data: true,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: errMsgFormat(error.errors),
      success: false,
    };
  }
};

const checkLogin = async (ctx) => {
  ctx.body = {success: true};
};

const update = async (ctx) => {
  const {username, email, newPasswd, confirmNewPasswd, oldPasswd} = ctx.request.body;
  const user = ctx.req.user;
  if (!username) {
    return ctx.body = {success: false, errMsg: '用户名不能为空'};
  }
  if (!email) {
    return ctx.body = {success: false, errMsg: 'email不能为空'};
  }
  if (newPasswd !== confirmNewPasswd) {
    return ctx.body = {success: false, errMsg: '两次密码不一样'};
  }
  if (!user.authenticate(oldPasswd)) {
    return ctx.body = {success: false, errMsg: '旧密码输入错误'};
  }
  user.password = newPasswd;
  user.username = username;
  user.email = email.toLowerCase();
  try {
    await user.save();
    ctx.body = {success: true};
  } catch (error) {
    console.log(error);
    ctx.body = error;
  }
};

const userinfo = async (ctx) => {
  const {id, username, email, avatar, updateTime, createTime} = ctx.req.user;
  ctx.body = {id, username, email, avatar, updateTime, createTime};
};

const userlist = async (ctx) => {
  try {
    const doc = await User.find();
    const list = doc.map(({id, username, email, avatar, updateTime, createTime}) => {
      return {id, username, email, avatar, updateTime, createTime};
    });
    ctx.body = {success: true, data: list};
  } catch (error) {
    console.log(error);
    ctx.body = {success: false, errMsg: error.message};
  }
};

module.exports = {
  registered,
  checkLogin,
  update,
  userinfo,
  userlist,
};
