import React from 'react';
import Tekster from './tekster/tekster';
import LoggInn from './logginn/logginn';
import Rediger from './rediger/rediger';
import DevTools from './devtools';

function Application() {
    return (
        <div className="application">
            <LoggInn />
            <Tekster />
            <DevTools />
        </div>
    );
}

export default Application;
