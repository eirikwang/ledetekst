import React, { PropTypes as PT } from 'react';
import { connect, Provider as ReduxProvider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nbLocale from 'react-intl/locale-data/nb';

/**
 * Provideren brukes for å passe storen til alle containere (smarte komponenter)
 * slik at vi slipper å eksplisitt passe den til hver container. Provider skal
 * kun brukes når vi rendrer rot-komponenten, se index.js
 */

addLocaleData(nbLocale);

function Provider({ store, ...props }) {
    return (
        <ReduxProvider store={store}>
            <IntlProvider {...props} />
        </ReduxProvider>
    );
}

Provider.propTypes = {
    store: PT.object.isRequired,
    children: PT.element.isRequired
};

const mapStateToProps = (state) => {
    const { intl } = state;
    return { ...intl };
};

export default connect(mapStateToProps)(Provider);
