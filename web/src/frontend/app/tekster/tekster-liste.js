import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';

/**
 * "Dum" komponent (i.e.  presentational component) for tekster-modulen(?)
 */

function Tekster({ tekster }) {
    const teksterElement = Object
        .entries(tekster.data)
        .map((tekst) => <li>{tekst}</li>);

    return (
        <div>
            <ul className="tekster">
                <h1>Ledertekster</h1>
                {teksterElement}
            </ul>
        </div>
    );
}

Tekster.propTypes = {
    tekster: storeShape(PT.object).isRequired
};

export default Tekster;
