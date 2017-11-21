import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from './routes';
import RouteWithSubs from './routes/RouteWithSubs';
import Header from './components/Header';
import Logo from './components/Icons/Logo';

const App = () => (
  <div>
    <Header>
      <Logo className="test" />
    </Header>
    <Router>
      <div className="admin">
        <Switch>{routes.map(route => <RouteWithSubs {...route} key={route.id} />)}</Switch>
      </div>
    </Router>
  </div>
);

export default App;
