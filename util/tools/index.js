const errMsgFormat = (errors) => {
  return Object.values(errors).map((item) => item.message).join('\b');
};


module.exports = {
  errMsgFormat,
};
