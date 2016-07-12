/* eslint-disable jsx-a11y/no-onchange*/
import React, { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from '../../../felles/utils';
import { oppdaterSokeboksVerdi } from './sok-actions';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.timeout = undefined;
    }

    settSoketekst(eventSok) {
        this.props.oppdaterSokeboksVerdi(eventSok.target.value);

        clearTimeout(this.timeout);
        this.timeout = setTimeout((tekst, settsoketekst, base) => {
            settsoketekst(tekst, base);
        }, 500, eventSok.target.value, this.props.settSoketekst, this.props.base);
    }

    sendQuery(event) {
        event.preventDefault();
        this.props.queryTekster(this.props.sokeboksVerdi, this.props.base);
    }

    render() {
        return (
            <form onSubmit={this.sendQuery}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <input
                        type="text"
                        name="sok"
                        placeholder="SØK PÅ NØKKEL"
                        className="sokefelt"
                        value={this.props.sokeboksVerdi}
                        onChange={this.settSoketekst}
                    />
                    <button type="submit" className="sokefelt-knapp-sok">
                        <span className="visuallyhidden">Søk</span>
                    </button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        sokeboksVerdi: state.sok.sokeboksVerdi
    };
}

function mapDispatchToProps(dispatch) {
    return {
        queryTekster: (sokeQuery, pathname) => {
            dispatch(push({ pathname, query: { sokeQuery } }));
        },
        settSoketekst: (sokeQuery, pathname) => {
            dispatch(push({ pathname, query: { sokeQuery } }));
        },
        oppdaterSokeboksVerdi: (sokeQuery) => {
            dispatch(oppdaterSokeboksVerdi(sokeQuery));
        }
    };
}

Sok.propTypes = {
    settSoketekst: PropTypes.func.isRequired,
    queryTekster: PropTypes.func.isRequired,
    base: PropTypes.string.isRequired,
    sokeQuery: PropTypes.string.isRequired,
    sokeboksVerdi: PropTypes.string.isRequired,
    oppdaterSokeboksVerdi: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sok);
