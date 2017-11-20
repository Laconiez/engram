import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from './routes';
import RouteWithSubs from './routes/RouteWithSubs';

const App = () => (
  <Router>
    <div className="admin">
      <Switch>{routes.map(route => <RouteWithSubs {...route} key={route.id} />)}</Switch>
    </div>
  </Router>
);

export default App;
