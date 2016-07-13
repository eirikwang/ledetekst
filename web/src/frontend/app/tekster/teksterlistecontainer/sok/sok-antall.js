import React, { PropTypes } from 'react';

function SokAntall({ filtrertListe, sokeQuery }) {
    if (sokeQuery.length !== 0) {
        return (<div className="soketreff" aria-live="assertive" aria-atomic="true">
            <span>{`${filtrertListe.data.length} treff på `}</span>
            <span className="typo-avsnitt">
                {{ sokeQuery }.length < 80 ? { sokeQuery } : `${sokeQuery.substring(0, 79)}...`}
            </span>
        </div>);
    }
    return null;
}

SokAntall.propTypes = {
    filtrertListe: PropTypes.object.isRequired,
    sokeQuery: PropTypes.string.isRequired
};

export default SokAntall;
