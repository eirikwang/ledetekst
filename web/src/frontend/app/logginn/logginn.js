import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loggInn } from './logginn-actions'

const LoggInn = ({ handleSubmit, navn, email }) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <p><input type="text" {...navn} name="navn" placeholder="Navn" /></p>
            <p><input type="text" {...email} name="email" placeholder="Email" /></p>
            <button type="submit">Logg Inn</button>
        </form>
    )
};

const mapStateToProps = (navn, email) => {
    return {
        felter: {navn, email}
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (navn, email) => {
            dispatch(loggInn(navn, email))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggInn);