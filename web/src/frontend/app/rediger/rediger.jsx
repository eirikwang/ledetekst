import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { autobind, finnTekst } from './../felles/utils';
import { sendRedigertTekst } from './rediger-actions';

class Rediger extends Component {

    constructor(props) {
        super(props);
        autobind(this);
    }

    hentRedigert(event) {
        event.preventDefault();
        const { applikasjon } = this.props;
        const { nokkel, spraak } = this.props.location.query;
        this.props.handleSubmit(applikasjon, nokkel, spraak,
            this.refs.endretTekst.value, this.refs.kommentar.value);
    }

    render() {
        const laster = this.props.status === 'laster';
        const knappSpinner = `knapp knapp-hoved knapp-liten ${laster ? ' knapp-spinner er-aktiv' : ''}`;
        const knappLaster = laster ? 'spinner-knapp' : '';

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
                        <button type="submit" className={knappSpinner} disabled={laster}>
                            Lagre<span className={knappLaster} />
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
        handleSubmit: (prosjekt, nokkel, spraak, tekst, kommentar) => {
            dispatch(sendRedigertTekst(prosjekt, nokkel, spraak, tekst, kommentar));
        },
        onClickHandler: () => {
            dispatch(goBack());
        }
    };
}

function mapStateToProps(state, ownProps) {
    return {
        tekster: state.tekster,
        status: state.rediger.status,
        applikasjon: ownProps.params.applikasjon
    };
}

Rediger.propTypes = {
    tekster: PT.object.isRequired,
    status: PT.string.isRequired,
    location: PT.object.isRequired,
    handleSubmit: PT.func.isRequired,
    onClickHandler: PT.func.isRequired,
    applikasjon: PT.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Rediger);
