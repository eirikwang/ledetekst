import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export function RedigerLink({ nokkel, spraak, base }) {
    return (
        <Link to={`${base}/rediger?nokkel=${nokkel}&spraak=${spraak}`}>{spraak}</Link>
    );
}

RedigerLink.propTypes = {
    nokkel: PropTypes.string.isRequired,
    spraak: PropTypes.string.isRequired,
    base: PropTypes.string
};

export default RedigerLink;
