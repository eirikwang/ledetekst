import React, { PropTypes as PT } from 'react';
import DevTools from './devtools';

function Application({ children }) {
    return (
        <div className="container">
            {children}
            <DevTools />
        </div>
    );
}

Application.propTypes = {
    children: PT.object.isRequired
};

export default Application;
