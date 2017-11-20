// import React from 'react';

import Dashboard from '../pages/Dashboard';
import Topics from '../pages/Topics';
import TopicEdit from '../pages/TopicEdit';
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
    component: TopicEdit,
  },
  {
    id: 'no-match',
    component: NoMatch,
  },
];

export default routes;
