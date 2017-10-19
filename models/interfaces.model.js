const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterfaceSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  path: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  // 创建人id
  create_id: {
    type: String,
  },
  req_query: [{
    key: String,
    value: String,
  }],
  req_body_type: {
    type: String,
    enum: ['form', 'json', 'text', 'file', 'raw'],
  },
  req_body_form: [{
    key: String,
    value: String,
  }],
  req_body_other: String,
  res_body_type: {
    type: String,
    enum: ['json', 'text', 'xml', 'raw'],
  },
  res_body: String,
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

InterfaceSchema
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
    message: '这个接口已经被使用!',
  });

module.exports = mongoose.model('Interface', InterfaceSchema, 'interfaces');
