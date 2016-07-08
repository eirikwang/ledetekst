import React, { PropTypes as PT } from 'react';
import DevTools from './devtools';

function Application() {
    return (
        <div className="container">
            {this.props.children}
            <DevTools />
        </div>
    );
}

Application.propTypes = {
    children: PT.object.isRequired
};

export default Application;
