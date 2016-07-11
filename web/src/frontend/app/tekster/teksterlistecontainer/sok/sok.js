import React, { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from '../../../felles/utils';
import { settSoketekst } from './sok-actions';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    settSoketekst(soketekst) {
        this.props.settSoketekst(soketekst.target.value, this.props.base);
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
                        placeholder="SØK PÅ NØKKEL"
                        className="sokefelt"
                        value={this.props.soketekst ? this.props.soketekst : ''}
                        onChange={this.settSoketekst}
                        onBlur={this.settSoketekst}
                    />
                    <button type="submit" className="sokefelt-knapp-sok">
                        <span className="visuallyhidden">Søk</span>
                    </button>
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryTekster: (soketekst, pathname) => {
            dispatch(push({ pathname, query: { soketekst } }));
        },
        settSoketekst: (soketekst, pathname) => {
            dispatch(push({ pathname, query: { soketekst } }));
            dispatch(settSoketekst(soketekst));
        }
    };
}

Sok.propTypes = {
    settSoketekst: PropTypes.func.isRequired,
    queryTekster: PropTypes.func.isRequired,
    base: PropTypes.string.isRequired,
    soketekst: PropTypes.string.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(Sok);
