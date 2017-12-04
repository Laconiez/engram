const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const routes = require('./api/routes');
const models = require('./api/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const { port } = config.server;

const args = (process.argv && process.argv.slice(2)) || [];

const app = new Koa();

if (args.length && args[0] === '--sync') {
  models.sequelize.sync();
  // eslint-disable-next-line
  console.log('Run DB sync');
}

app.use(cors());
app.use(bodyParser());
app.use(routes.routes());

app.listen(port);

// eslint-disable-next-line
console.log(`Start listening on port ${port}`);
