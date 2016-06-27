import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

let LoggInn = ({ dispatch }) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p><input type="text" name="Logg inn" placeholder="Email"/></p>
                <p><input type="password" name="Passord" placeholder="Passord"/></p>
                <button onClick={handleSubmit}>Logg Inn</button>
            </form>
        </div>
    )
}

LoggInn = connect()(LoggInn)

export default LoggInn