const User = require('../models/users.model');

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
    ctx.body = {
      errorMsg: Object.values(error.errors).map((item) => item.message).join('\b'),
      success: false,
    };
  }
};

const checkLogin = async (ctx) => {
  ctx.body = {success: true};
};

const update = async (ctx) => {
  const {username, email, id} = ctx.request.body;
  const map = {
    updated: new Date().toLocaleString(),
  };
  if (username) map.username = username;
  if (email) map.email = email;
  try {
    console.log(map);
    await User.findByIdAndUpdate({_id: id}, {$set: map});
    ctx.body = {success: true};
  } catch (error) {
    console.log(error);
    ctx.body = error;
    // ctx.body = {errMsg: '错误', success: false};
  }
};

const userinfo = async (ctx) => {
  const {id, username, email, avatar, updateTime, createTime} = ctx.req.user;
  ctx.body = {id, username, email, avatar, updateTime, createTime};
};

module.exports = {
  registered,
  checkLogin,
  update,
  userinfo,
};
