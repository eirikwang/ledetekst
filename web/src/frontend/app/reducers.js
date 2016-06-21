import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import teksterReducer from './tekster/tekster-reducer';
import meldingerReducer from './felles/meldinger-reducer';

const reducers = combineReducers({
    routing: routerReducer,
    tekster: teksterReducer,
    intl: meldingerReducer
});

export default reducers;
