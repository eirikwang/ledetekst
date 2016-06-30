import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind, finnTekst } from './../felles/utils';
import { sendRedigertTekst } from './rediger-actions';

class RedigerTekstboks extends Component {

    constructor(props) {
        super(props);
        autobind(this);
        this.nokkel = this.props.location.query.nokkel;
        this.spraak = this.props.location.query.spraak;
    }

    hentRedigert(event) {
        event.preventDefault();
        this.props.handleSubmit(this.nokkel, this.spraak, this.refs.tekst.value,
            this.props.navn, this.props.email);
    }
    render() {
        const tekst = finnTekst(this.nokkel, this.spraak, this.props.tekster.data);
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
        tekster: state.tekster,
        navn: state.autentisert.data.navn,
        email: state.autentisert.data.email
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedigerTekstboks);
