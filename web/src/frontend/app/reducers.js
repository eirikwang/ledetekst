import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import teksterReducer from './tekster/tekster-reducer';
import meldingerReducer from './felles/meldinger-reducer';
import logginnReducer from './logginn/logginn-reducer';
import redigerReducer from './rediger/rediger-reducer';
import applikasjonReducer from './applikasjoner/applikasjoner-reducer';
import sokreducer from './tekster/teksterlistecontainer/sok/sok-reducer';

const reducers = combineReducers({
    routing: routerReducer,
    tekster: teksterReducer,
    intl: meldingerReducer,
    autentisert: logginnReducer,
    rediger: redigerReducer,
    applikasjoner: applikasjonReducer,
    sok: sokreducer
});

export default reducers;
