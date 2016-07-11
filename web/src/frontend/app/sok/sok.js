import React, { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from './../felles/utils';
import { settSoketekst } from './sok-actions';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    sendQuery(event) {
        event.preventDefault();
        console.log('dette er nokkelen: ');
        this.props.queryTekster(this.props.soketekst);
    }

    render() {
        console.log(this.props.soketekst);
        return (
            <form onSubmit={this.sendQuery}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <input
                        type="text"
                        name="sok"
                        placeholder="SØK PÅ NØKKEL"
                        className="sokefelt"
                        sokeTekst={this.props.soketekst}
                        onChange={this.props.settSoketekst}
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
        queryTekster: (sok) => {
            dispatch(push({ pathname: '/', query: { sok } }));
        },
        settSoketekst: (soketekst) => {
            dispatch(settSoketekst(soketekst));
        }
    };
}

function mapStateToProps(state) {
    return {
        soketekst: state.sok.soketekst
    };
}

Sok.propTypes = {
    queryTekster: PropTypes.func.isRequired,
    soketekst: PropTypes.string.isRequired,
    settSoketekst: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sok);
