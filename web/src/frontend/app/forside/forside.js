import React from 'react';
import Tekster from './../tekster/tekster';
import LoggInn from './../logginn/logginn';

function Forside() {
    return (
        <div>
            <LoggInn />
            <Tekster />
        </div>
    );
}

export default Forside;
