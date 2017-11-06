const Router = require('koa-router');
const Boom = require('boom');
const topics = require('./topics');

const router = new Router({
  prefix: '/api',
});
router.use(
  '/',
  topics.routes(),
  topics.allowedMethods({
    throw: true,
    // eslint-disable-next-line
    notImplemented: () => new Boom.notImplemented(),
    // eslint-disable-next-line
    methodNotAllowed: () => new Boom.methodNotAllowed(),
  }),
);

module.exports = router;
