const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Boom = require('boom');

const { createDBConnection, defineModels } = require('./sql/sql');
const setupMappings = require('./sql/mappings');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const { User, Topic, Article, Question } = setupMappings(sql);

sql
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    sql.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

router
  .get('/', async ctx => {
    ctx.body = 'hey there';
  })
  .get('/test/:test', async ctx => {
    ctx.body = `test result ${ctx.params.test}`;
  })
  .get('/topics', async ctx =>
    Topic.findAll().then(topics => {
      ctx.body = topics;
    })
  )
  .get('/topics/:id', async ctx =>
    Topic.findById(ctx.params.id).then(topic => {
      ctx.body = topic;
    })
  )
  .post('/topics', async ctx => {
    Topic.create(ctx.request.body).then(newTopic => {
      ctx.body = newTopic;
    });
  })
  .put('/topics/:id', async ctx =>
    Topic.update(ctx.request.body, {
      where: {
        id: ctx.params.id,
      },
    }).then(topic => {
      ctx.body = topic;
    })
  )
  .delete('/topics/:id', async ctx =>
    Topic.destroy({
      where: {
        id: ctx.params.id,
      },
    }).then(() => {
      ctx.status = 204;
    })
  );

app.use(router.routes());
app.use(
  router.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  })
);

app.listen(3131);
