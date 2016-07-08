import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import createStore from './store.js';
import Application from './application';
import Provider from './provider';
import Applikasjoner from './applikasjoner/applikasjoner';
import Tekster from './tekster/tekster';
import TeksterListe from './tekster/tekster-liste';
import RedigerTekstboks from './rediger/rediger-tekstboks';
import { syncHistoryWithStore } from 'react-router-redux';

const realHistory = useRouterHistory(createHistory)({
    basename: '/ledeteksteditor'
});
const store = createStore(realHistory);
const history = syncHistoryWithStore(realHistory, store);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Application}>
                <IndexRoute component={Applikasjoner} />
                <Route path="/tekster/:applikasjon" component={Tekster}>
                    <IndexRoute component={TeksterListe} />
                    <Route path="rediger" component={RedigerTekstboks} />
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('mainapp'));
