import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';

function Tekster({ tekster }) {
    const teksterElement = Object
        .entries(tekster.data.ledetekster)
        .map(([,value]) => <li key={value.nokkel}>{`${value.nokkel} --> ${value.spraak.nb}`}</li>);

    return (
        <div>
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