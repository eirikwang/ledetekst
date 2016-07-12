import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { storeShape } from '../../felles/proptype-shapes';
import Sok from './sok/sok';
import TeksterListe from './teksterliste/tekster-liste';
import { filtrerListe } from '../../felles/utils';

function TeksterListeContainer({ tekster, base, sokeQuery }) {
    const filtrertListe = filtrerListe(tekster, sokeQuery);

    function antallTreff() {
        if (sokeQuery.length !== 0) {
            return (<div className="soketreff">
                <span>{`${filtrertListe.data.length} treff på `}</span>
                <span className="typo-avsnitt">{`${sokeQuery}`}</span>
            </div>);
        }
        return null;
    }

    return (
        <div>
            <h1 className="typo-sidetittel text-center">Ledertekster</h1>
            <Sok base={base} sokeQuery={sokeQuery} />
            <span>{antallTreff()}</span>
            <TeksterListe tekster={filtrertListe} base={base} />
        </div>
    );
}

TeksterListeContainer.propTypes = {
    tekster: storeShape(PT.object).isRequired,
    base: PT.string.isRequired,
    sokeQuery: PT.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return { tekster: state.tekster, base: ownProps.location.pathname, sokeQuery: state.sok.sokeQuery };
}

export default connect(mapStateToProps)(TeksterListeContainer);
