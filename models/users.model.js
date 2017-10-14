const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  hashedPassword: String,
  salt: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  provider: {
    type: String,
    default: 'local',
  },
  github: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  avatar: String,
  status: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
    };
  });

UserSchema
  .path('username')
  .validate({
    isAsync: true,
    validator: function(v, cb) {
      this.constructor.findOne({username: v}, function(err, user) {
        if (user) {
          cb(false);
        }
        cb(true);
      });
    },
    message: '这个呢称已经被使用!',
  });

UserSchema
  .path('email')
  .validate({
    isAsync: true,
    validator: function(v, cb) {
      this.constructor.findOne({email: v}, function(err, user) {
        if (user) {
          cb(false);
        }
        cb(true);
      });
    },
    message: '这个邮箱已经被使用!',
  });

UserSchema.methods = {
  // 验证用户密码
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  // 生成盐
  makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  },
  // 生成密码
  encryptPassword(password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  },
};

UserSchema.set('toObject', {virtuals: true});

// exports.UserSchema = UserSchema;
module.exports = mongoose.model('User', UserSchema, 'users');
