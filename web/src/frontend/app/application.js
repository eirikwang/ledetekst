import React from 'react';
import Tekster from './tekster/tekster';
import LoggInn from './logginn/logginn';
import DevTools from './devtools';

function Application() {
    return (
        <div className="container">
            <LoggInn />
            <Tekster />
            <DevTools />
        </div>
    );
}

export default Application;
