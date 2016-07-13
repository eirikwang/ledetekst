/* eslint-disable jsx-a11y/no-onchange*/
import React, { PropTypes, Component } from 'react';
import DebouncedInput from 'react-debounce-input';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from '../../../felles/utils';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    settSoketekst(eventSok) {
        eventSok.preventDefault();
        this.props.settSoketekst(eventSok.target.value, this.props.base);
    }

    render() {
        return (
            <form className="blokk-xxs" onSubmit={this.settSoketekst}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <DebouncedInput
                        debounceTimeout={500}
                        name="sok"
                        value={this.props.sokeQuery}
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
        sokeQuery: state.sok.sokeQuery
    };
}

function mapDispatchToProps(dispatch) {
    return {
        settSoketekst: (sokeQuery, pathname) => {
            dispatch(push({ pathname, query: { sokeQuery } }));
        }
    };
}

Sok.propTypes = {
    settSoketekst: PropTypes.func.isRequired,
    base: PropTypes.string.isRequired,
    sokeQuery: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sok);
