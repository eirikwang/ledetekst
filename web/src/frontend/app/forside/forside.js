import React from 'react';
import Tekster from './../tekster/tekster';
import Sok from './../sok/sok';

function Forside(props) {
    return (
        <div>
            <Sok />
            <Tekster {...props}/>
        </div>
    );
}

export default Forside;
