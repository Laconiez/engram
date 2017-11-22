import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './styles/fonts.css';

import routes from './routes';
import RouteWithSubs from './routes/RouteWithSubs';
import Header from './components/Header';

const App = () => (
  <Router>
    <div className="admin">
      <Header />
      <Switch>{routes.map(route => <RouteWithSubs {...route} key={route.id} />)}</Switch>
    </div>
  </Router>
);

export default App;
