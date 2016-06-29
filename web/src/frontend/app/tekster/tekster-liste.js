import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';
import RedigerLink from '../redigerlink/redigerlink'

function mapTilHtml(tekstMap) {
    const nokkel = tekstMap[1].nokkel;
    const spraakObj = tekstMap[1].spraak;
    return (

        <ul key={nokkel} className="ustilet blokk">
            <div className="typo-element">{nokkel}</div>
            Språk
            <ul type="disc">
                
                {Object.entries(spraakObj).map(([key, value]) => <li key={key}><RedigerLink nokkel={nokkel} spraak={key} />: {value}</li>)}
            </ul>
        </ul>
    );

}

function Tekster({ tekster }) {
    const teksterElement = Object
        .entries(tekster.data)
        .map((tekstMap) => mapTilHtml(tekstMap));

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
