import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { autobind, finnTekst } from './../felles/utils';
import { sendRedigertTekst } from './rediger-actions';

class RedigerTekstboks extends Component {

    constructor(props) {
        super(props);
        autobind(this);
    }

    hentRedigert(event) {
        event.preventDefault();
        this.props.handleSubmit(this.props.location.query.nokkel, this.props.location.query.spraak,
            this.refs.tekst.value);
    }

    render() {
        //const tekst = finnTekst(this.props.location.query.nokkel, this.props.location.query.spraak,
            //this.props.tekster.data);
        const tekst = "Dummy data, dette er litt tekst";
        return (
            <div className="rediger-ledetekst-element">
                <div className="typo-etikett-stor tekst-uendretinnhold">{tekst}</div>
                Ny tekst:
                <form className="form-redigertekst" onSubmit={this.hentRedigert}>
                    <textarea className="textarea-redigertekst" name="tekst" ref="tekst" defaultValue={tekst} />
                    <button type="submit" className="knapp knapp-hoved knapp-liten knapp-lagretekst">Lagre</button>
                    <button className="knapp knapp-fare knapp-liten knapp-avbrytrediger">Avbryt</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (nokkel, spraak, tekst) => {
            dispatch(sendRedigertTekst(nokkel, spraak, tekst));
        }
    };
}

function mapStateToProps(state) {
    return {
        tekster: state.tekster
    };
}

RedigerTekstboks.propTypes = {
    tekster: PT.object.isRequired,
    location: PT.object.isRequired,
    handleSubmit: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RedigerTekstboks);
