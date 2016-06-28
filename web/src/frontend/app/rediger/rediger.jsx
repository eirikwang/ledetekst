import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

Rediger.propTypes = {
    nokkel: PT.string.isRequired,
    spraak: PT.string.isRequired
};
