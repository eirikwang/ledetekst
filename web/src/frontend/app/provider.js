import React, { PropTypes as PT } from 'react';
import { connect, Provider as ReduxProvider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import nbLocale from 'react-intl/locale-data/nb';

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
