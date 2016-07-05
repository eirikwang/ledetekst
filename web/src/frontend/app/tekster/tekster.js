import React, {Component, PropTypes as PT} from 'react';
import {connect} from 'react-redux';
import TeksterListe from './tekster-liste';

function Tekster({ tekster }) {
    return (
        <TeksterListe tekster={tekster} />
    );
}

Tekster.propTypes = {
    tekster: PT.object.isRequired,
    actions: PT.shape({
        fetchTekster: PT.func.isRequired
    })
};

function mapStateToProps({ tekster }) {
    return { tekster };
}

export default connect(mapStateToProps)(Tekster);
