import React from 'react';
import { render } from 'react-dom';
import Application from './application';
import Http, { toText } from './http';

Http.get('/ledeteksteditor/api/test').then(toText)
    .then(([resp, value]) => {
        const message = !resp.ok ? 'noe feilet' : value;
        render(<Application isAlive={message} />, document.getElementById('mainapp'));
    });

