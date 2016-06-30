import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchLedetekst } from './../rediger/rediger-actions';


function RedigerLink({ nokkel, spraak, redigerLedetekstDispatcher }) {
    const redigerLedetekst = (event) => {
        event.preventDefault();
        redigerLedetekstDispatcher(nokkel, spraak);
    };

    return (
        <a onClick={redigerLedetekst} href="javascript:void(0)">{spraak}</a> // eslint-disable-line no-script-url
    );
}

function mapDispatchToProps(dispatch) {
    return {
        redigerLedetekstDispatcher: (nokkel, spraak) => {
            dispatch(fetchLedetekst(nokkel, spraak));
            dispatch(push('/nokkel&spraak'));
        }
    };
}

RedigerLink.propTypes = {
    nokkel: PropTypes.string.isRequired,
    spraak: PropTypes.string.isRequired,
    redigerLedetekstDispatcher: PropTypes.func.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(RedigerLink);
