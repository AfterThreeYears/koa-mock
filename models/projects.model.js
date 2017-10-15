const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  basepath: {
    type: String,
    default: '/',
  },
  desc: String,
  project_type: {
    type: String,
    required: true,
    enum: ['public', 'private'],
  },
  members: [
    {
      uid: Number,
      role: {
        type: String,
        enum: ['owner', 'dev'],
      },
      username: String,
      email: String,
    },
  ],
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

module.exports = mongoose.model('Project', ProjectSchema, 'projects');
