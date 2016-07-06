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
        this.props.handleSubmit(this.refs.epost.value);
    }

    render() {
        return (
            <div className="logginn-beholder">
                <h1 className="hode-undertittel  hode-dekorert blokk-m">Logg inn</h1>
                <form onSubmit={this.hentInput}>
                    <div className="nav-input text-align-left blokk-l">
                        <label clasName="typo-infotekst" htmlFor="epost">E-post:</label>
                        <input className="input-fullbredde" type="text" ref="epost" name="epost" placeholder="E-post" />
                    </div>
                    <div className="blokk-xl">
                        <button type="submit" className="knapp knapp-hoved knapp-liten">Logg Inn</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (epost) => {
            dispatch(loggInn(epost));
        }
    };
}

LoggInn.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(LoggInn);
