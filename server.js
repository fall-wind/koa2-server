import Koa from 'koa'
import views from 'koa-views'
import path from 'path'
const mount = require('koa-mount')
import config from './config/index'
import bodyParser from 'koa-bodyparser'
import router from 'koa-router'
// import connectHistoryApiFallback from 'connect-history-api-fallback'
const session = require("koa-session2")    
const passport = require(__dirname + '/passport_config.js')
const xauth = require(__dirname + '/xauth.js')

const app = new Koa();
app.use(require('koa-static')(path.join(__dirname, '../react-demo/dist')))

app.use(views(path.join(__dirname, '../react-demo/dist'), {
	extension: 'html'
}))

app.use(session({key: "SESSIONID"}))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(mount('/',xauth.routes()))

app.use(require('./routers/index.js').routes())

app.use(async (ctx) => {
  	await ctx.render('index')
})

app.listen(config['port'])

console.log(`l am running at ${config['port']}`)
