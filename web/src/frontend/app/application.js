import React, { PropTypes as PT } from 'react';
import DevTools from './devtools';
import HeaderInfo from './headerinfo/headerinfo';

function Application({ children }) {
    return (
        <div>
            <HeaderInfo />
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

