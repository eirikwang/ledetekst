import React, { PropTypes as PT } from 'react';
import DevTools from './devtools';
import Header from './header/header';

function Application({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                {children}
                <DevTools />
            </div>
        </div>
    );
}

Application.propTypes = {
    children: PT.object.isRequired
};

export default Application;

