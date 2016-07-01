import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';
import RedigerLink from './../redigerlink/redigerlink';

function hentLedetekstListe(ledetekst) {
    return (
        <ul type="disc">
            {Object.entries(ledetekst.spraak).map(([spraak, innhold]) =>
                <li key={spraak}>
                    <RedigerLink nokkel={ledetekst.nokkel} spraak={spraak} />: {innhold}
                </li>)}
        </ul>
    );
}

function Tekster({ tekster }) {
    const teksterElement = tekster.data.map((ledetekst) => {
        return (
            <li key={ledetekst.nokkel}>
                <div className="typo-element">{ledetekst.nokkel}</div>
                Språk
                {hentLedetekstListe(ledetekst)}
            </li>
        );
    });

    return (
        <div>
            <h1 className="typo-sidetittel">Ledertekster</h1>
            <ul className="tekster">
                {teksterElement}
            </ul>
        </div>
    );
}

Tekster.propTypes = {
    tekster: storeShape(PT.object).isRequired
};

export default Tekster;
