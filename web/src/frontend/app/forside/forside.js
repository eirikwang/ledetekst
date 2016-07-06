import React from 'react';
import Tekster from './../tekster/tekster';
import LoggInn from './../logginn/logginn';
import Rediger from './../rediger/rediger';

function Forside() {
    return (
        <div>
            <LoggInn />
            <Tekster />
        </div>
    );
}

export default Forside;
