import React, { PropTypes as PT, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { fetchLedetekst } from './rediger-actions';
import { autobind, finnTekst } from './../felles/utils';

class Rediger extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    hentInput(event) {
        event.preventDefault();
        if (!this.props.loggetInn) {
            console.log('Du må logge inn før du kan redigere tekster'); // eslint-disable-line no-console
            return;
        }
        const queryTekst = finnTekst(this.refs.nokkel.value, this.refs.spraak.value, this.props.tekster.data);
        if (queryTekst === '') return;
        this.props.handleSubmit(this.refs.nokkel.value, this.refs.spraak.value, queryTekst);
    }
    
    render() {
        return (
            <form onSubmit={this.hentInput}>
                <p><input type="text" ref="nokkel" name="nokkel" placeholder="Nøkkel" label="ledetekstnøkkel" /></p>
                <p><input type="text" ref="spraak" name="spraak" placeholder="Språk" label="språk" /></p>
                <button type="submit">Hent tekst</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (nokkel, spraak, tekst) => {
            dispatch(fetchLedetekst(nokkel, spraak, tekst));
            dispatch(push({ pathname: '/rediger', query: { nokkel, spraak } }));
        }
    };
}

function mapStateToProps(state) {
    return {
        tekster: state.tekster,
        loggetInn: state.autentisert.status === 'LOGGET_INN'
    };
}

Rediger.propTypes = {
    tekster: PT.object.isRequired,
    loggetInn: PT.bool.isRequired,
    handleSubmit: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Rediger);
