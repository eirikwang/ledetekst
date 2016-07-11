import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import TeksterListe from './tekster-liste';
import Sok from './../sok/sok';

export function filtrerListe(tekster, search) {
    if (search) {
        const sokeResultat = tekster.data.filter(t => t.nokkel.includes(search));
        return { ...tekster, data: sokeResultat };
    }
    return tekster;
}

function Tekster({ tekster, search }) {
    const filtrertListe = filtrerListe(tekster, search);
    console.log(filtrertListe);
    return (
        <div>
            <Sok search={search} />
            <TeksterListe tekster={filtrertListe} />
        </div>
    );
}

Tekster.propTypes = {
    tekster: PT.object.isRequired,
    search: PT.string.isRequired
};

function mapStateToProps({ tekster }, ownProps) {
    return { tekster, search: ownProps.location.query.sok };
}

export default connect(mapStateToProps)(Tekster);
