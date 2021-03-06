import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './pages/layout';
import Index from './pages/index/index.jsx';
import StudyList from './pages/study_list/index.jsx';
import StudyDetail from './pages/study_detail/index.jsx';
import Bind from './pages/index/bind.jsx';
import CategoryRecord from './pages/index/category_record';
import Collect from './pages/index/collect';
import {store, history} from './store';

export default (
    <Provider store={store}>
        <Router history={history}>
            <Route path="client" component={Layout}>
                <IndexRoute component={Index} />
                <Route path="list">
                    <IndexRoute component={StudyList} />
                    <Route path="detail" component={StudyDetail}/>
                </Route>
                <Route path="bind" component={Bind}/>
                <Route path="collect" component={Collect}/>
                <Route path="record">
                    <IndexRoute component={CategoryRecord}/>
                </Route>
            </Route>
        </Router>
    </Provider>
);