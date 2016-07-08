import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import TeksterListe from './tekster-liste';

export function filtrerListe(tekster, search) {
    if (search) {
        const sokeResultat = tekster.data.filter(t => t.nokkel === search)
        return { ...tekster, data: sokeResultat };
    } else {
        return tekster;
    }
}

function Tekster({ tekster, search }) {
    const filtrertListe = filtrerListe(tekster, search);
    console.log(filtrertListe);
    return (
        <TeksterListe tekster={filtrertListe} />
    );
}

Tekster.propTypes = {
    tekster: PT.object.isRequired
};

function mapStateToProps({ tekster }, ownProps) {
    console.log(ownProps, ownProps.get)
    return { tekster, search: ownProps.location.query.data };
}

export default connect(mapStateToProps)(Tekster);
