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
        this.props.handleSubmit(this.refs.navn.value, this.refs.epost.value);
    }
    render() {
        return (
            <form onSubmit={this.hentInput}>
                <p><input type="text" ref="navn" name="navn" placeholder="Navn" /></p>
                <p><input type="text" ref="epost" name="epost" placeholder="epost" /></p>
                <button type="submit">Logg Inn</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (navn, epost) => {
            dispatch(loggInn(navn, epost));
        }
    };
}

LoggInn.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default connect(() => ({}), mapDispatchToProps)(LoggInn);
