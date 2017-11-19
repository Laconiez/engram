const Router = require('koa-router');
const models = require('../models');
const Boom = require('boom');

const router = new Router({
  prefix: 'topics',
});

router
  .get('/', async (ctx) => {
    try {
      const topics = await models.Topic.findAll();
      ctx.body = topics;
    } catch (e) {
      ctx.body = Boom.badImplementation('Something went wrong');
    }
  })
  .get('/:id', ctx =>
    models.Topic.findById(ctx.params.id).then((topic) => {
      ctx.body = topic;
    }))
  .post('/', ctx =>
    models.Topic.create(ctx.request.body).then((newTopic) => {
      ctx.body = newTopic;
    }))
  .put('/:id', ctx =>
    models.Topic
      .update(ctx.request.body, {
        where: {
          id: ctx.params.id,
        },
      })
      .then((topic) => {
        ctx.body = topic;
      }))
  .delete('/:id', ctx =>
    models.Topic
      .destroy({
        where: {
          id: ctx.params.id,
        },
      })
      .then(() => {
        ctx.status = 204;
      }));

module.exports = router;
