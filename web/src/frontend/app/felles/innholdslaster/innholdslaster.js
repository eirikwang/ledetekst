import React, { PropTypes as PT } from 'react';
import Feil from './innholdslaster-feil';
import Laster from './innholdslaster-laster';
import { storeShape } from '../proptype-shapes';
import { STATUS } from './../konstanter';

const harStatus = (status) => (element) => element.status === status;
const noenHarFeil = (avhengigheter) => avhengigheter && avhengigheter.some(harStatus(STATUS.feilet));
const alleLastet = (avhengigheter) => avhengigheter && avhengigheter.every(harStatus(STATUS.lastet));
const medFeil = (avhengigheter) => avhengigheter.find(harStatus(STATUS.feilet));

const Innholdslaster = ({ avhengigheter, children }) => {
    if (alleLastet(avhengigheter)) {
        return <div>{children}</div>;
    }
    if (noenHarFeil(avhengigheter)) {
        const feilendeReducer = medFeil(avhengigheter);
        const callId = feilendeReducer.data.data.callId;
        const id = feilendeReducer.data.data.id;
        return <Feil callId={callId} id={id} />;
    }
    return <Laster />;
};

Innholdslaster.propTypes = {
    avhengigheter: PT.arrayOf(storeShape(PT.object)),
    children: PT.node.isRequired
};

export default Innholdslaster;
