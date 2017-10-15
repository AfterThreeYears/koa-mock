const Project = require('../models/projects.model');

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
    const doc = await newProjetc.save();
    ctx.body = {success: true, data: doc};
  } catch (error) {
    ctx.body = {
      errorMsg: error,
      success: false,
    };
  }
};

module.exports = {
  create,
};
