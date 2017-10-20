const Interface = require('../models/interfaces.model');
const Project = require('../models/projects.model');
// const {errMsgFormat} = require('../util/tools');

const create = async (ctx) => {
  const {
    name,
    path,
    projectId,
    method,
    reqQuery,
    reqBodyType,
    reqBodyForm,
    reqBodyOther,
    resBodyType,
    resBody,
  } = ctx.request.body;
  const {
    id,
  } = ctx.req.user;
  try {
    const reqJSON = JSON.parse(reqQuery || '[]');
    const reqBodyFormJSON = JSON.parse(reqBodyForm || '[]');
    const newInterface = new Interface({
      name,
      path,
      projectId,
      method,
      createId: id,
      editerId: id,
      reqQuery: reqJSON,
      reqBodyType,
      reqBodyForm: reqBodyFormJSON,
      reqBodyOther,
      resBodyType,
      resBody,
    });
    const doc = await newInterface.save();
    ctx.body = {success: true, data: doc};
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: error,
      success: false,
    };
  }
};

const update = async (ctx) => {
  const {
    interfaceId,
    name,
    path,
    projectId,
    method,
    reqQuery,
    reqBodyType,
    reqBodyForm,
    reqBodyOther,
    resBodyType,
    resBody,
  } = ctx.request.body;
  const {
    id,
  } = ctx.req.user;
  try {
    const projectDoc = await Project.find({_id: projectId, 'members': id});
    if (!projectDoc.length) throw new Error('没有权限');
    const reqJSON = JSON.parse(reqQuery || '[]');
    const reqBodyFormJSON = JSON.parse(reqBodyForm || '[]');
    const doc = await Interface.findOneAndUpdate(
      {_id: interfaceId, projectId},
      {
        name,
        path,
        projectId,
        method,
        editerId: id,
        reqQuery: reqJSON,
        reqBodyType,
        reqBodyForm: reqBodyFormJSON,
        reqBodyOther,
        resBodyType,
        resBody,
      }
    );
    ctx.body = {success: true, data: doc};
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: error,
      success: false,
    };
  }
};

const remove = async (ctx) => {
  const {interfaceId, projectId} = ctx.request.body;
  const {id} = ctx.req.user;
  try {
    const projectDoc = await Project.find({_id: projectId, 'members': id});
    if (!projectDoc.length) throw new Error('没有权限');
    const interfaceDoc = await Interface.remove({_id: interfaceId});
    if (interfaceDoc.result.n) {
      ctx.body = {
        errorMsg: '删除成功',
        success: true,
      };
    } else {
      throw new Error('删除失败');
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: error.message,
      success: false,
    };
  }
};

const detail = async (ctx) => {
  const {interfaceId, projectId} = ctx.request.query;
  const {id} = ctx.req.user;
  try {
    const projectDoc = await Project.find({_id: projectId, 'members': id});
    if (!projectDoc.length) throw new Error('没有权限');
    const interfaceDoc = await Interface.findById(interfaceId);
    if (interfaceDoc) {
      ctx.body = {
        data: interfaceDoc,
        success: true,
      };
    } else {
      throw new Error('获取失败');
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: error.message,
      success: false,
    };
  }
};

const alllist = async (ctx) => {
  const {projectId} = ctx.request.query;
  const {id} = ctx.req.user;
  try {
    const projectDoc = await Project.find({_id: projectId, 'members': id});
    if (!projectDoc.length) throw new Error('没有权限');
    const interfaceDocList = await Interface.find({projectId});
    if (interfaceDocList) {
      ctx.body = {
        data: interfaceDocList,
        success: true,
      };
    } else {
      throw new Error('获取失败');
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      errorMsg: error.message,
      success: false,
    };
  }
};

const mock = async (ctx) => {
  ctx.body = 1;
};

module.exports = {
  create,
  update,
  remove,
  alllist,
  detail,
  mock,
};
