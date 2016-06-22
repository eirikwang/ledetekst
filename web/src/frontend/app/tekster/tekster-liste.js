import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';

/**
 * "Dum" komponent (i.e.  presentational component) for tekster-modulen(?)
 */

function mapTilHtml(tekstMap){
    const nokkel = tekstMap[1].nokkel;
    const spraakObj = tekstMap[1].spraak;

    let htmltekst = `<li>${nokkel}</li>`;
    htmltekst += `<li>Språk<ul>`;
    for(let key in spraakObj){
        let value = spraakObj[key];
        htmltekst += `<li>${key}: ${value}</li>`;
    }
    htmltekst += `</ul></li>`;
    console.log("Ferdig html for en nøkkel:");
    console.log(htmltekst);
    return htmltekst;
}

function Tekster({ tekster }) {
    var liste = document.createElement("tekster");
    const teksterElement = Object
        .entries(tekster.data)
        .map((tekstMap) => mapTilHtml(tekstMap));
    liste.innerHTML = teksterElement;
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
