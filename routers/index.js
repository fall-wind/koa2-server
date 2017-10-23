const router = require('koa-router')()
import { queryAllArticles, addUser, queryAllUser } from '../db'



// 获取文章列表
router.get('/api/get/articles', async (ctx, next) => {
    const articlesList = await queryAllArticles()
    ctx.body = {
        articlesList,
        message: '获取成功',
    }
})

// 用户注册
router.post('/api/add/user', async (ctx, next) => {
    const { name, password } = ctx.request.body
    const result = await addUser([name, password])
    if (result.insertId) {
        ctx.body = {
            message: '新增用户成功，请返回登录',
            code: 100,
            insertId: result.insertId,
        }
    } else {
        ctx.body = {
            code: 101,
            message: '新增失败'
        }
    }
})

router.post('/api/query/users', async (ctx, next) => {
    const usersList = await queryAllUser()
    ctx.body = {
        code: 100,
        usersList,
        message: '获取成功',
    }
})

module.exports = router
