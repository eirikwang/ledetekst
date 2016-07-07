import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from './../felles/utils';
import { queryTekster } from './sok-actions';

class Sok extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    sendQuery(event) {
        event.preventDefault();
        this.props.queryTekster(this.refs.queryTekst.value);
    }

    render() {
        return (
            <form onSubmit={this.sendQuery}>
                <div className="sokefelt">
                    <label htmlFor="sok" className="visuallyhidden">Søk</label>
                    <input type="text" ref="queryTekst" name="sok" placeholder="SØK PÅ NØKKEL" />
                    <button type="submit" className="knapp-sok">
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
            dispatch(queryTekster(data));
        }
    };
}

function mapStateToProps(state) {
    return {
        tekster: state.tekster
    };
}

Sok.propTypes = {
    tekster: PropTypes.object.isRequired,
    queryTekster: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sok);
