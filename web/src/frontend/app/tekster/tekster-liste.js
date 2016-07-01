import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';
import RedigerLink from './../redigerlink/redigerlink';

function Tekster({ tekster }) {
    const hentInnholdFor = (ledetekst) =>
        <ul type="disc">
            {Object.keys(ledetekst.spraak).map((spraak) =>
                <li key={spraak}>
                    <RedigerLink nokkel={ledetekst.nokkel} spraak={spraak} />: {ledetekst.spraak[spraak]}
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
