import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';

function mapTilHtml(tekstMap) {
    const nokkel = tekstMap[1].nokkel;
    const spraakObj = tekstMap[1].spraak;
    const htmltekst = (
        <ul key={nokkel}>
            <li>{nokkel}</li>
            <li>Språk
                <ul>
                {Object.entries(spraakObj).map(([key, value]) => <li key={key}>{key}: {value}</li>)}
                </ul>
            </li>
        </ul>
    );
    return htmltekst;
}

function Tekster({ tekster }) {
    const teksterElement = Object
        .entries(tekster.data)
        .map((tekstMap) => mapTilHtml(tekstMap));

    return (
        <div>
            <h1>Ledertekster</h1>
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
