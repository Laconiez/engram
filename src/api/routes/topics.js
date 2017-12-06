const Router = require('koa-router');
const models = require('../models');
const Boom = require('boom');

const articles = require('./articles');

const router = new Router({
  prefix: 'topics',
});

router.use(
  '/:topicId/',
  articles.routes(),
  articles.allowedMethods({
    throw: true,
    // eslint-disable-next-line
    notImplemented: () => new Boom.notImplemented(),
    // eslint-disable-next-line
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }),
);

router
  .get('/', async (ctx) => {
    try {
      const topics = await models.Topic.findAll();
      ctx.body = topics;
    } catch (e) {
      ctx.body = Boom.badImplementation('Something went wrong');
    }
  })
  .get('/:topicId', ctx =>
    models.Topic.findById(ctx.params.topicId).then((topic) => {
      ctx.body = topic;
    }))
  .post('/', ctx =>
    models.Topic.create(ctx.request.body).then((newTopic) => {
      ctx.body = newTopic;
    }))
  .put('/:topicId', ctx =>
    models.Topic.update(ctx.request.body, {
      where: {
        id: ctx.params.topicId,
      },
    }).then((topic) => {
      ctx.body = topic;
    }))
  .delete('/:topicId', ctx =>
    models.Topic.destroy({
      where: {
        id: ctx.params.topicId,
      },
    }).then(() => {
      ctx.status = 204;
    }));

module.exports = router;
