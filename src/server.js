const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./api/routes');
const models = require('./api/models');

const args = (process.args && process.args.slice(2)) || [];

const app = new Koa();

if (args.length && args[0] === 'sync') {
  models.sequelize.sync();
}

app.use(bodyParser());
app.use(routes.routes());

app.listen(3131);
