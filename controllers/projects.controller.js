const Project = require('../models/projects.model');
const {errMsgFormat} = require('../util/tools');

const create = async (ctx) => {
  const {name, basepath, desc, project_type} = ctx.request.body;
  const {uid, username, email} = ctx.req.user;
  if (!name) ctx.body = {success: false, errMsg: '项目名是必填的'};
  if (!project_type) ctx.body = {success: false, errMsg: '项目类型是必填的'};
  const newProjetc = new Project({
    name,
    basepath,
    desc,
    project_type,
    members: [
      {
        uid,
        role: 'owner',
        username,
        email,
      },
    ],
  });
  try {
    await newProjetc.save();
    ctx.body = {success: true, data: true};
  } catch (error) {
    ctx.body = {
      errorMsg: errMsgFormat(error.errors),
      success: false,
    };
  }
};

module.exports = {
  create,
};
