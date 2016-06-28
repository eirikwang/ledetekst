import React, { PropTypes as PT } from 'react';

function TekstBoks({ nokkel, spraak }) {
    const tekst = 'Dummy ledetekst for å komme i gang!';
    return (
        <div>
            <h1>Rediger tekst for {nokkel} og {spraak}</h1>
            <input type="text" value={tekst} />
        </div>
    );
}

TekstBoks.propTypes = {
    nokkel: PT.string.isRequired,
    spraak: PT.string.isRequired
};

export default TekstBoks;
