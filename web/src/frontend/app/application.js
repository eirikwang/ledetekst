import React from 'react';
import Tekster from './tekster/tekster';
import { defineMessages, FormattedMessage } from 'react-intl';
import LoggInn from './logginn/logginn';
import Rediger from './rediger/rediger';


function Application() {
    return (
        <div className="application">
            <LoggInn />
            <Rediger />
            <Tekster />
            
        </div>
    );
}

export default Application;
