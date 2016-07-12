/* eslint-disable jsx-a11y/no-onchange*/
import React, { PropTypes, Component } from 'react';
import DebouncedInput from 'react-debounce-input';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from '../../../felles/utils';
import { oppdaterSokeboksVerdi } from './sok-actions';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    settSoketekst(eventSok) {
        this.props.settSoketekst(eventSok.target.value, this.props.base);
    }

    render() {
        return (
            <form onSubmit={this.settSoketekst}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <DebouncedInput
                        debounceTimeout={500}
                        name="sok"
                        value={this.props.soketekst}
                        placeholder="SØK PÅ NØKKEL"
                        className="sokefelt"
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
        soketekst: state.sok.soketekst
    };
}

function mapDispatchToProps(dispatch) {
    return {
        settSoketekst: (soketekst, pathname) => {
            dispatch(push({ pathname, query: { soketekst } }));
        }
    };
}

Sok.propTypes = {
    settSoketekst: PropTypes.func.isRequired,
    base: PropTypes.string.isRequired,
    soketekst: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sok);
