import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import config from './config/index'
import router from 'koa-router'
const app = new Koa();
app.use(require('koa-static')(path.join(__dirname, '../react-demo/dist')))
app.use(views(path.join(__dirname, '../views'), {
  extension: 'html'
}));
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(require('./routers/index.js').routes())
// response

// 默认render index.html???
// app.use(async(ctx) => {
//   await ctx.render(path.join(__dirname, '../react-demo/dist/index.html'))
// });
app.listen(config['port'])
