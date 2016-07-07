import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
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
            this.refs.endretTekst.value, this.refs.kommentar.value);
    }

    render() {
        const spinnerKnappLaster = this.props.status === 'laster' ? ' knapp-spinner er-aktiv' : '';
        const tekst = finnTekst(this.props.location.query.nokkel, this.props.location.query.spraak,
            this.props.tekster.data);

        return (
            <div className="rediger-ledetekst-element">
                Orginal tekst: {tekst}
                <form onSubmit={this.hentRedigert}>
                    <div className="nav-input">
                        <label htmlFor="endretTekst">Ny tekst:</label>
                        <textarea
                            className="input-fullbredde textarea-redigertekst"
                            name="endretTekst"
                            ref="endretTekst"
                            defaultValue={tekst}
                        />
                    </div>
                    <div className="nav-input">
                        <label htmlFor="kommentar">Kommentar:</label>
                        <textarea
                            className="input-fullbredde textarea-redigertekst"
                            name="kommentar"
                            ref="kommentar"
                            placeholder="Endret via ledeteksteditor"
                        />
                    </div>
                    <div className="knapperad knapperad-adskilt knapperad-hoyrestilt">
                        <button
                            type="submit"
                            className={`knapp knapp-hoved knapp-liten
                            ${spinnerKnappLaster}`}
                            disabled={this.props.status === 'laster'}
                        >
                            Lagre<span className={this.props.status === 'laster' ? 'spinner-knapp' : ''} />
                        </button>
                        <a
                            href="javascript:void(0)" // eslint-disable-line no-script-url
                            onClick={this.props.onClickHandler}
                            className="lenke-fremhevet lenke-avstand"
                        >
                            Avbryt
                        </a>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (nokkel, spraak, tekst, kommentar) => {
            dispatch(sendRedigertTekst(nokkel, spraak, tekst, kommentar));
        },
        onClickHandler: () => {
            dispatch(goBack());
        }
    };
}

function mapStateToProps(state) {
    return {
        tekster: state.tekster,
        status: state.rediger.status
    };
}

RedigerTekstboks.propTypes = {
    tekster: PT.object.isRequired,
    status: PT.string.isRequired,
    location: PT.object.isRequired,
    handleSubmit: PT.func.isRequired,
    onClickHandler: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RedigerTekstboks);
