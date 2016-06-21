import React from 'react';
import Tekster from './tekster/tekster';
import DevTools from './devtools';
import { defineMessages, FormattedMessage } from 'react-intl';

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
            <Tekster />
            <DevTools />
        </div>
    );
}

export default Application;
