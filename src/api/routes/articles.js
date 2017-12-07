const Router = require('koa-router');
const models = require('../models');
const Boom = require('boom');

const questions = require('./questions');

const router = new Router({
  prefix: 'articles',
});

router.use(
  '/:articleId/',
  questions.routes(),
  questions.allowedMethods({
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
      const articles = await models.Article.findAll({
        where: {
          TopicId: ctx.params.topicId,
        },
      });
      ctx.body = articles;
    } catch (e) {
      ctx.body = Boom.badImplementation('Something went wrong');
    }
  })
  .get('/:articleId', ctx =>
    models.Article.findById(ctx.params.articleId).then((topic) => {
      ctx.body = topic;
    }))
  .post('/', async (ctx) => {
    const articleData = { ...ctx.request.body, TopicId: ctx.params.topicId };
    const article = await models.Article.create(articleData);
    ctx.body = article;
  })
  .put('/:articleId', async (ctx) => {
    const article = models.Article.update(ctx.request.body, {
      where: {
        id: ctx.params.articleId,
      },
    });
    ctx.body = { ...article };
  })
  .delete('/:articleId', ctx =>
    models.Article.destroy({
      where: {
        id: ctx.params.articleId,
      },
    }).then(() => {
      ctx.status = 204;
    }));

module.exports = router;
