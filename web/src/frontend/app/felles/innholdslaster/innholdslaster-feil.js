import React, { PropTypes as PT } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import Infoboks from './../designmanual/infoboks';

/* eslint-disable max-len */
const meldinger = defineMessages({
    overskrift: {
        id: 'innholdslaster.feil.overskrift',
        defaultMessage: 'Obs!'
    }, feilmelding: {
        id: 'innholdslaster.feil.melding',
        defaultMessage: 'En beskrivende feil. Kunne ikke laste alle data som trengs for å rendre komponent. Callid: {callId} bruk denne for å melde feil'
    }
});
/* eslint-enable max-len */

function Feil({ callId }) {
    const tittel = <h4><FormattedMessage {...meldinger.overskrift} /></h4>;
    return (
        <Infoboks tittel={tittel} type="feil">
            <FormattedMessage {...meldinger.feilmelding} values={{ callId }} />
        </Infoboks>
    );
}

Feil.propTypes = {
    callId: PT.string
};

export default Feil;

