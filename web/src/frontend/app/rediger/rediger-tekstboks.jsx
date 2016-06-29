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
        this.props.handleSubmit(this.refs.tekst.value);
    }
    render() {
        const tekst = 'Dummy ledetekst for å komme i gang!';
        return (
            /*
            <div>
                <form onSubmit={this.hentRedigert}>
                    <textarea rows="4" cols="50" name="tekst" ref="tekst">
                        {tekst}
                    </textarea>
                    <button type="submit">Lagre tekst</button>
                </form>
            </div>
            */
            <div class="nav-input">
                <label for="detaljer">
                    Redigere Ledetekst
                </label>
                <form onSubmit={this.hentRedigert}>
                    <textarea rows="5" id="tekst" name="tekst" class="input-fullbredde">
                        {tekst}
                    </textarea>
                    <button type="submit" class="knapp knapp-hoved knapp-liten">
                        Lagre tekst
                    </button>
                </form>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (tekst) => {
            dispatch(sendRedigertTekst(tekst));
        }
    };
}

function mapStateToProps({ tekst }) {
    return { tekst };
}

TekstBoks.propTypes = {
    tekst: PT.string.isRequired,
    handleSubmit: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TekstBoks);
