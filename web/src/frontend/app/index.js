import React from 'react';
import { render } from 'react-dom';
import Application from './application';
import Http, { toText } from './http';

Http.get('/ledeteksteditor/api/test').then(toText)
    .then(([resp]) => {
        render(<Application isAlive={resp.ok} />, document.getElementById('mainapp'));
    });

