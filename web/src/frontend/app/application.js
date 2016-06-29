import React from 'react';
import Tekster from './tekster/tekster';
import DevTools from './devtools';
import { defineMessages, FormattedMessage } from 'react-intl';
import LoggInn from './logginn/logginn';
import Rediger from './rediger/rediger';

const meldinger = defineMessages({
    overskrift: {
        id: 'application.tittel',
        defaultMessage: 'Ledeteksteditor'
    }
});

function Application() {
    return (
        <div className="application">
            <h1><FormattedMessage {...meldinger.overskrift} /></h1>
            <hr />
            <LoggInn />
            <Rediger />
            <Tekster />
            <DevTools />
        </div>
    );
}

export default Application;
