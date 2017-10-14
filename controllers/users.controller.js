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

module.exports = {
  registered,
  checkLogin,
};
