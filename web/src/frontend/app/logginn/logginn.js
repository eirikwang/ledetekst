import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {loggInn} from './logginn-actions'
import { autobind } from './../felles/utils';

class LoggInn extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    foo(event) {
        event.preventDefault();
        this.props.handleSubmit(this.refs.navn.value, this.refs.email.value)
    }

    render() {
        return (
            <form onSubmit={this.foo}>
                <p><input type="text" ref="navn" name="navn" placeholder="Navn"/></p>
                <p><input type="text" ref="email" name="email" placeholder="Email"/></p>
                <button type="submit">Logg Inn</button>
            </form>
        )
    };
}

const mapStateToProps = ({ navn, email }) => ({ navn, email });
//     return {
//         navn,
//         email
//     }
// };

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (navn, email) => {
            dispatch(loggInn(navn, email))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggInn);