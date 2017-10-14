module.exports = {
  mongo: {
    uri: 'mongodb://localhost:27017/koa_mock',
    options: {},
  },
  redis: {
    host: '',
    port: '',
    password: '',
  },
  session: {
    secrets: 'node',
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  },
};
