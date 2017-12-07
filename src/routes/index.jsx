// import React from 'react';

import Dashboard from '../pages/Dashboard';
import Topics from '../pages/Topics';
import TopicEdit from '../pages/TopicEdit';
import ArticleEdit from '../pages/ArticleEdit';
import QuestionEdit from '../pages/QuestionEdit';
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
    exact: true,
    component: ArticleEdit,
  },
  {
    id: 'question-edit',
    path: '/topics/:topicId/articles/:articleId/questions/:questionId',
    component: QuestionEdit,
  },
  {
    id: 'no-match',
    component: NoMatch,
  },
];

export default routes;
