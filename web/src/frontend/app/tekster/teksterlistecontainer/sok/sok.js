/* eslint-disable jsx-a11y/no-onchange*/
import React, { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from '../../../felles/utils';
import { oppdaterTempSoketekst } from './sok-actions';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.timeout = undefined;
    }

    settSoketekst(soketekst) {
        this.props.oppdaterTempSoketekst(soketekst.target.value);

        clearTimeout(this.timeout);
        this.timeout = setTimeout((tekst, func, base) => {
            func(tekst, base);
        }, 500, soketekst.target.value, this.props.settSoketekst, this.props.base);
    }

    sendQuery(event) {
        event.preventDefault();
        this.props.queryTekster(this.props.soketekst, this.props.base);
    }

    render() {
        return (
            <form onSubmit={this.sendQuery}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <input
                        type="text"
                        name="sok"
                        ref="sok"
                        placeholder="SØK PÅ NØKKEL"
                        className="sokefelt"
                        value={this.props.tempSoketekst}
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
        tempSoketekst: state.sok.tempSoketekst
    };
}

function mapDispatchToProps(dispatch) {
    return {
        queryTekster: (soketekst, pathname) => {
            dispatch(push({ pathname, query: { soketekst } }));
        },
        settSoketekst: (soketekst, pathname) => {
            dispatch(push({ pathname, query: { soketekst } }));
        },
        oppdaterTempSoketekst: (soketekst) => {
            dispatch(oppdaterTempSoketekst(soketekst));
        }
    };
}

Sok.propTypes = {
    settSoketekst: PropTypes.func.isRequired,
    queryTekster: PropTypes.func.isRequired,
    base: PropTypes.string.isRequired,
    soketekst: PropTypes.string.isRequired,
    tempSoketekst: PropTypes.string.isRequired,
    oppdaterTempSoketekst: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sok);
