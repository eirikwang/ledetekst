import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { storeShape } from '../../felles/proptype-shapes';
import Sok from './sok/sok';
import TeksterListe from './teksterliste/tekster-liste';
import { filtrerListe } from '../../felles/utils';

function TeksterListeContainer({ tekster, base, soketekst }) {
    const filtrertListe = filtrerListe(tekster, soketekst);

    return (
        <div>
            <Sok base={base} soketekst={soketekst} />
            <TeksterListe tekster={filtrertListe} base={base} />
        </div>
    );
}

TeksterListeContainer.propTypes = {
    tekster: storeShape(PT.object).isRequired,
    base: PT.string.isRequired,
    soketekst: PT.string.isRequired
};
function mapStateToProps(state, ownProps) {
    return { tekster: state.tekster, base: ownProps.location.pathname, soketekst: state.sok.soketekst };
}
export default connect(mapStateToProps)(TeksterListeContainer);
