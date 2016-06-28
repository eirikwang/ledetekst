import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hentLedetekst } from 'rediger-actions';

class Rediger extends Component {
    render() {
        return (
            <form>
                <p><input type="text" ref="nokkel" name="nokkel" placeholder="Nokkel" /></p>
                <p><input type="text" ref="spraak" name="spraak" placeholder="Spraak" /></p>
                <button type="submit">Hent tekst</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (nokkel, spraak) => {
            dispatch(hentLedetekst(nokkel, spraak));
        }
    };
}

Rediger.propTypes = {
    handleSubmit: PT.func.isRequired
};
