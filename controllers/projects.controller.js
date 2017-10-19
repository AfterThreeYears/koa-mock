const Project = require('../models/projects.model');
const {errMsgFormat} = require('../util/tools');

const create = async (ctx) => {
  const {name, basepath, desc, project_type} = ctx.request.body;
  const {id} = ctx.req.user;
  if (!name) ctx.body = {success: false, errMsg: '项目名是必填的'};
  if (!project_type) ctx.body = {success: false, errMsg: '项目类型是必填的'};
  const newProjetc = new Project({
    name,
    basepath,
    desc,
    project_type,
    members: [
      {
        uid: id,
        role: 'owner',
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

const update = async (ctx) => {
  const {name, basepath, desc, project_type, projectId} = ctx.request.body;
  const {id} = ctx.req.user;
  if (!name) return ctx.body = {success: false, errMsg: '项目名是必填的'};
  if (!project_type) return ctx.body = {success: false, errMsg: '项目类型是必填的'};
  try {
    const doc = await Project.findOneAndUpdate(
      {_id: projectId, 'members.uid': id},
      {name, basepath, desc, project_type}
    );
    if (!doc) throw new Error('没有权限');
    ctx.body = doc;
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: error.message,
      success: false,
    };
  }
};

const alllist = async (ctx) => {
  const {id} = ctx.req.user;
  try {
    const doc = await Project.find({});
    const projects = doc.filter((item) => {
      if (item.project_type === 'public') return item;
      const findUser = item.members.find((subItem) => {
        return subItem.uid === id;
      });
      if (findUser) return item;
    });
    ctx.body = {success: true, data: projects};
  } catch (error) {
    console.log(error);
    ctx.body = {success: false, errMsg: error.message};
  }
};

const getOne = async (ctx) => {
  const projectId = ctx.params.id;
  const {id} = ctx.req.user;
  try {
    const doc = await Project.find({'_id': projectId, 'members.uid': id});
    if (doc.length) {
      ctx.body = {success: true, data: doc};
    } else {
      ctx.body = {success: false, data: '没有权限'};
    }
  } catch (error) {
    console.log(error);
    ctx.body = {success: false, errMsg: error.message};
  }
};

module.exports = {
  create,
  update,
  alllist,
  getOne,
};
