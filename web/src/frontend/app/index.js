import React, { Component } from 'react';
import { render } from 'react-dom';
import Http, { toText } from './http';

function restIsAlive() {
    return Http.get('/ledeteksteditor/api/test')
        .then(toText);
}

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'venter...'
        };
    }

    componentDidMount() {
        restIsAlive()
            .then(([resp]) => {
                if (resp.ok) {
                    this.setState({ status: 'rest api ok' });
                } else {
                    this.setState({ status: 'rest api feilet' });
                }
            })
            .catch(() => {
                this.setState({ status: 'rest api feilet' });
            });
    }

    render() {
        return (
            <div className="index">
                <h1>React header</h1>
                <p><b>Status: </b><span>{this.state.status}</span></p>
            </div>
        );
    }
}

render(<Application />, document.getElementById('mainapp'));
