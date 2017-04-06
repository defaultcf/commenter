const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const render = require('koa-ejs');

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'html'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(route.get('/', async function (ctx) {
  await ctx.render('index');
}));

const server = app.listen(8000);
