import DevTools from './devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import Reducers from './reducers';
import { erDev } from './felles/utils';

/**
 * Store "binder" reducers og actions sammen. 
 */

function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

function getDevStoreCompose() {
    return compose(
        applyMiddleware(thunkMiddleware),
        DevTools.instrument(),
        persistState(getDebugSessionKey())
    );
}

function getStoreCompose() {
    return compose(
        applyMiddleware(thunkMiddleware)
    );
}

export default function create() {
    const composed = erDev() ? getDevStoreCompose() : getStoreCompose();

    return composed(createStore)(Reducers, {});
}
