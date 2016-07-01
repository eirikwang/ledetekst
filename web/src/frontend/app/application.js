import React from 'react';
import Tekster from './tekster/tekster';
import DevTools from './devtools';

function Application() {
    return (
        <div className="application">
            <Tekster />
            <DevTools />
        </div>
    );
}

export default Application;
