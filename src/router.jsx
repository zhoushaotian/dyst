import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './pages/layout';
import Index from './pages/index/index.jsx';
import store from './store';

export default (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <Route path="/client" component={Index}/>
            </Route>
        </Router>
    </Provider>
);