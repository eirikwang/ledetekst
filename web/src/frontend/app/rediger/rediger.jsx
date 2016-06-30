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
        const tekster = this.props.tekster.data;
        const queryNokkel = this.refs.nokkel.value;
        const querySpraak = this.refs.spraak.value;
        const teksterForNokkel = tekster.filter(t => t.nokkel === queryNokkel);
        if (teksterForNokkel.length < 1) {
            console.log('Fant ikke tekster for denne nøkkelen');
            return;
        }
        console.log(teksterForNokkel);
        const teksterForSpraak = teksterForNokkel[0].spraak;
        if (!(querySpraak in teksterForSpraak)) {
            console.log('Fant ikke tekst for språket og nøkkelen');
            return;
        }
        console.log(teksterForSpraak[querySpraak]);
        this.props.handleSubmit(queryNokkel, querySpraak, teksterForSpraak[querySpraak]);
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
        handleSubmit: (nokkel, spraak, tekst) => {
            dispatch(fetchLedetekst(nokkel, spraak, tekst));
            dispatch(push('/nokkel&spraak'));
        }
    };
}

function mapStateToProps(state) {
    return {
        tekster: state.tekster
    };
}

Rediger.propTypes = {
    tekster: PT.object.isRequired,
    handleSubmit: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Rediger);
