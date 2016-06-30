import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export function RedigerLink({ nokkel, spraak }) {
    return (
        <Link to={`rediger?nokkel=${nokkel}&spraak=${spraak}`}>{spraak}</Link>
    );
}

RedigerLink.propTypes = {
    nokkel: PropTypes.string.isRequired,
    spraak: PropTypes.string.isRequired
};

export default RedigerLink;
