const router = require('koa-router')()

router.get('/api', async(ctx, next) => {
    ctx.body = { status: 1, msg: '成功获取', articles: 'hahahha' }
})

router.get('/api/about', async(ctx, next) => {
    ctx.body = { status: 1, msg: '成功获取', about: 'OK' }
})

module.exports = router
