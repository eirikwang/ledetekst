import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import teksterReducer from './tekster/tekster-reducer';
import meldingerReducer from './felles/meldinger-reducer';
import logginnReducer from './logginn/logginn-reducer';

const reducers = combineReducers({
    routing: routerReducer,
    tekster: teksterReducer,
    intl: meldingerReducer,
    logginn: logginnReducer
});

export default reducers;
