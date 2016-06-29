import React, { PropTypes as PT, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchLedetekst } from './rediger-actions';
import { autobind } from './../felles/utils';

class Rediger extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    hentInput(event) {
        event.preventDefault();
        this.props.handleSubmit(this.refs.nokkel.value, this.refs.spraak.value);
    }
    render() {
        return (
            <form onSubmit={this.hentInput}>
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
            dispatch(fetchLedetekst(nokkel, spraak));
            dispatch(push('/nokkel&spraak'));
        }
    };
}

Rediger.propTypes = {
    handleSubmit: PT.func.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(Rediger);
