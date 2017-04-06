const path = require('path');
const Koa = require('koa');
const route = require('koa-route');
const render = require('koa-ejs');
const serve = require('koa-static');

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
app.use(serve(__dirname + '/html/static'));

const server = app.listen(8000);

const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
  socket.on('comment', (data) => {
    socket.emit('commented', {'value':data.value});
  });
});
