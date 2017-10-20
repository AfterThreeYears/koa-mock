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
  projectId: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  // 创建人id
  createId: {
    type: String,
    required: true,
  },
  // 编辑人id
  editerId: {
    type: String,
    required: true,
  },
  reqQuery: Array,
  reqBodyType: {
    type: String,
    enum: ['form', 'json', 'text', 'file', 'raw'],
  },
  reqBodyForm: Array,
  reqBodyOther: String,
  resBodyType: {
    type: String,
    enum: ['json', 'text', 'xml', 'raw'],
  },
  resBody: String,
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
