const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
import { findDataByName } from './db/index'

// 用户名密码验证策略
passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    },
    function (username, password, done) {
        findDataByName(username).then(function (result) {
            if (result != null && Array.isArray(result) && result.length == 1) {
                if (result[0].password == password) {
                    return done(null, result)
                } else {
                    return done(null, false, '密码错误')
                }
            } else {
                return done(null, false, '未知用户')
            }
        }).catch(function (err) {
            log.error(err.message)
            return done(null, false, { message: err.message })
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    return done(null, user)
})

module.exports = passport
