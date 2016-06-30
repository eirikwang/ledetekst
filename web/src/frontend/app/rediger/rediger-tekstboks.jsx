import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { autobind } from './../felles/utils';
import { sendRedigertTekst } from './rediger-actions';

class TekstBoks extends Component {

    constructor(props) {
        super(props);
        autobind(this);
    }

    hentRedigert(event) {
        event.preventDefault();
        this.props.handleSubmit(this.props.nokkel, this.props.spraak, this.refs.tekst.value,
            this.props.navn, this.props.email);
    }
    render() {
        const tekst = this.props.tekst;
        return (
            <div>
                <form onSubmit={this.hentRedigert}>
                    <textarea rows="4" cols="50" name="tekst" ref="tekst">
                        {tekst}
                    </textarea>
                    <button type="submit">Lagre tekst</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (nokkel, spraak, tekst, navn, email) => {
            dispatch(sendRedigertTekst(nokkel, spraak, tekst, navn, email));
        }
    };
}

function mapStateToProps(state) {
    return {
        nokkel: state.rediger.data.nokkel,
        spraak: state.rediger.data.spraak,
        tekst: state.rediger.data.innhold,
        navn: state.autentisert.data.navn,
        email: state.autentisert.data.email
    };
}

TekstBoks.propTypes = {
    nokkel: PT.string.isRequired,
    spraak: PT.string.isRequired,
    tekst: PT.string.isRequired,
    navn: PT.string.isRequired,
    email: PT.string.isRequired,
    handleSubmit: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TekstBoks);
