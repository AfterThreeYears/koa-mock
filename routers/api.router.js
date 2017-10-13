const router = require('koa-router')();

router.get('/', (ctx) => {
    ctx.body = '我是api的/路径';
});

router.get('/test', (ctx) => {
    ctx.body = '我是api的/test路径';
});


module.exports = router;
