import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import TeksterListe from './tekster-liste';

function filtrerListe(tekster, search) {
    if (search !== "") {
        return tekster.filter(t => t.data.nokkel === search);
    } else {
        return tekster;
    }
}

function Tekster({ tekster }) {
    //filtrertListe = filtrerListe(tekster, search);
    //console.log(filtrertListe);
    return (
        <TeksterListe tekster={tekster} />
    );
}

Tekster.propTypes = {
    tekster: PT.object.isRequired
};

function mapStateToProps({ tekster }) {
    return { tekster };
}

export default connect(mapStateToProps)(Tekster);
