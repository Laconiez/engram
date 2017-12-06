const Router = require('koa-router');
const models = require('../models');
const Boom = require('boom');

const router = new Router({
  prefix: 'questions',
});

router
  .get('/', async (ctx) => {
    try {
      const questions = await models.Question.findAll({
        where: {
          ArticleId: ctx.params.articleId,
        },
      });
      ctx.body = questions;
    } catch (e) {
      ctx.body = Boom.badImplementation('Something went wrong');
    }
  })
  .get('/:questionId', async (ctx) => {
    try {
      const question = await models.Question.findById(ctx.params.questionId);
      ctx.body = question;
    } catch (e) {
      ctx.body = Boom.badImplementation('Something went wrong');
    }
  })
  .post('/', async (ctx) => {
    const questionData = { ...ctx.request.body, TopicId: ctx.params.topicId };
    const question = await models.Question.create(questionData);
    ctx.body = question;
  })
  .put('/:questionId', async (ctx) => {
    const question = models.Question.update(ctx.request.body, {
      where: {
        id: ctx.params.questionId,
      },
    });
    ctx.body = { ...question };
  })
  .delete('/:questionId', ctx =>
    models.Question.destroy({
      where: {
        id: ctx.params.questionId,
      },
    }).then(() => {
      ctx.status = 204;
    }));

module.exports = router;
