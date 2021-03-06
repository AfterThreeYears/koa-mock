const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  basepath: {
    type: String,
    default: '/',
  },
  desc: String,
  projectType: {
    type: String,
    required: true,
    enum: ['public', 'private'],
  },
  owner: {
    type: String,
    required: true,
  },
  members: Array,
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
});

ProjectSchema
  .path('name')
  .validate({
    isAsync: true,
    validator: function(v, cb) {
      this.constructor.findOne({name: v}, function(err, project) {
        if (project) {
          cb(false);
        }
        cb(true);
      });
    },
    message: '这个项目名已经被使用!',
  });

module.exports = mongoose.model('Project', ProjectSchema, 'projects');
