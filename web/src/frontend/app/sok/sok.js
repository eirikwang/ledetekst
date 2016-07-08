import React, { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { autobind } from './../felles/utils';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    sendQuery(event) {
        console.log('sendQuery');
        event.preventDefault();
        this.props.queryTekster(this.refs.queryTekst.value);
    }

    render() {
        return (
            <form onSubmit={this.sendQuery}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <input
                        type="text"
                        ref="queryTekst"
                        name="sok"
                        placeholder="SØK PÅ NØKKEL"
                        className="sokefelt-input"
                    />
                    <button type="submit" className="søkefelt-knapp-sok">
                        <span className="visuallyhidden">Søk</span>
                    </button>
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryTekster: (data) => {
            dispatch(push({ pathname: '/', query: { data } }));
        }
    };
}

Sok.propTypes = {
    queryTekster: PropTypes.func.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(Sok);
