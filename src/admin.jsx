import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import HeadTitle from './components/HeadTitle';
import App from './AppAdmin';

ReactDOM.render(<HeadTitle title="Engram Admin panel" />, document.querySelector('title'));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
