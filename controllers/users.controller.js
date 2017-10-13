const foo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('setTimeout');
    }, 3000);
  });
};

const test = async (ctx) => {
  const result = await foo();
  ctx.body = result;
};


const index = (ctx) => {
  ctx.body = 'result';
};

module.exports = {
  test,
  index,
};