import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchLedetekst } from './../rediger/rediger-actions';


export function RedigerLink({ nokkel, spraak, redigerLedetekstDispatcher }) {

    return (
        <>{spraak}</a> // eslint-disable-line no-script-url
    );
}

RedigerLink.propTypes = {
    nokkel: PropTypes.string.isRequired,
    spraak: PropTypes.string.isRequired
};

export default RedigerLink;
