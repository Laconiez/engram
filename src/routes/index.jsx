// import React from 'react';

import Dashboard from '../pages/Dashboard';
import Topics from '../pages/Topics';
import TopicEdit from '../pages/TopicEdit';
import ArticleEdit from '../pages/ArticleEdit';
import NoMatch from '../pages/NoMatch';

const routes = [
  {
    id: 'home',
    path: '/',
    component: Dashboard,
    exact: true,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    id: 'topics',
    path: '/topics',
    exact: true,
    component: Topics,
  },
  {
    id: 'topic-edit',
    path: '/topics/:topicId',
    exact: true,
    component: TopicEdit,
  },
  {
    id: 'article-edit',
    path: '/topics/:topicId/articles/:articleId',
    component: ArticleEdit,
  },
  {
    id: 'no-match',
    component: NoMatch,
  },
];

export default routes;
