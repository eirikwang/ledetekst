import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { storeShape } from '../../felles/proptype-shapes';
import Sok from './sok/sok';
import TeksterListe from './teksterliste/tekster-liste';
import { filtrerListe } from '../../felles/utils';

function TeksterListeContainer({ tekster, base, sokeQuery }) {
    const filtrertListe = filtrerListe(tekster, sokeQuery);

    return (
        <div>
            <Sok base={base} sokeQuery={sokeQuery} />
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
