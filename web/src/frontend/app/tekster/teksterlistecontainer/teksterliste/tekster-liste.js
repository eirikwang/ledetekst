import React, { PropTypes } from 'react';
import { storeShape } from '../../../felles/proptype-shapes';
import RedigerLink from '../../../redigerlink/redigerlink';

function TeksterListe({ tekster, base }) {
    const hentInnholdFor = (ledetekst) =>
        <ul type="disc">
            {Object.keys(ledetekst.spraak).map((spraak) =>
                <li key={spraak}>
                    <RedigerLink base={base} nokkel={ledetekst.nokkel} spraak={spraak} />: {ledetekst.spraak[spraak]}
                </li>)}
        </ul>;


    const teksterElement = tekster.data.map((ledetekst) =>
        <li key={ledetekst.nokkel} className="blokk-s">
            <div className="typo-element">{ledetekst.nokkel}</div>
            Språk
            {hentInnholdFor(ledetekst)}
        </li>
    );

    return (
        <div>
            <ul className="tekster">
                {teksterElement}
            </ul>
        </div>
    );
}

TeksterListe.propTypes = {
    tekster: storeShape(PropTypes.object).isRequired,
    base: PropTypes.string.isRequired
};

export default TeksterListe;
