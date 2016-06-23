/* eslint-disable import/no-mutable-exports */
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { erDev } from './felles/utils';


let devTools;
if (erDev()) {
    devTools = createDevTools(
        <DockMonitor
            toggleVisibilityKey="ctrl-y"
            changePositionKey="ctrl-q"
            fluid={false}
            defaultSize={300}
            defaultIsVisible={false}
        >
            <LogMonitor />
        </DockMonitor>
    );

    // eslint-disable-next-line no-console
    console.log('Kjører i dev-modus, trykk ctrl+y for å åpne DevTools');
} else {
    devTools = () => <div style={{ display: 'none' }}></div>;
}

export default devTools;
