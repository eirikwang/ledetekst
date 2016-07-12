import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { loggInn } from './logginn-actions';
import { autobind } from './../felles/utils';

class LoggInn extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    hentInput(event) {
        event.preventDefault();
        const nesteSide = this.props.location.state ? this.props.location.state : undefined;
        this.props.handleSubmit(this.refs.epost.value, nesteSide);
    }

    render() {
        let warning = this.props.ugyldigEpost ? 'Ugyldig e-post' : '';
        let klasser = `nav-input text-left blokk-l ${this.props.ugyldigEpost ? ' har-valideringsfeil' : ''}`;
        return (
            <div className="logginn-beholder">
                <h1 className="hode-undertittel  hode-dekorert blokk-m">Logg inn</h1>
                <form onSubmit={this.hentInput}>
                    <div className={klasser}>
                        <label clasName="typo-infotekst" htmlFor="input-epost">
                            NAV e-post:
                        </label>
                        <input
                            className="input-fullbredde"
                            type="text"
                            ref="epost"
                            name="epost"
                            id="input-epost"
                            placeholder="brukernavn@nav.no"
                            aria-describedby="error-epost"
                            autoFocus="true"
                        />
                        <span className="skjema-feilmelding" role="alert" id="error-epost">
                            {warning}
                        </span>
                    </div>
                    <div className="blokk-l">
                        <button type="submit" className="knapp knapp-hoved knapp-liten">Logg Inn</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (epost, nesteSide) => {
            dispatch(loggInn(epost, nesteSide));
        }
    };
}

function mapStateToProps(state) {
    return {
        ugyldigEpost: state.autentisert.status === 'LOGGINN_FEILET'
    };
}

LoggInn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    location: PropTypes.shape({
        state: PropTypes.object
    }),
    ugyldigEpost: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggInn);
