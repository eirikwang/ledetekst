import React, { PropTypes as PT } from 'react';

const Application = ({ isAlive }) => (
    <div className="index">
        <h1>React header</h1>
        <p><b>Status: </b><span>{isAlive}</span></p>
    </div>
);

Application.propTypes = {
    isAlive: PT.bool.isRequired
};

export default Application;
