import React, { PropTypes as PT } from 'react';

function hentLoggInnInfo(loggInnData) {
    if (!loggInnData.navn) {
        return (
            <noscript>Du er ikke logget inn</noscript>
        );
    }
    return (
        <div className="logginn-info">
            <span className="typo-undertekst">Du er logget inn som {loggInnData.navn} </span>
            <button className="knapp knapp-hoved knapp-liten">Logg ut</button>
        </div>
    );
}

export function HeaderInfo({ loggInnData }) {
    console.log('Inne i HeaderInfo-komponent');
    return (
        <header className="siteheader" role="banner">
            <div className="site-coltrols-toolbar site-controls-toolbar">
                <div className="container">
                    <div className="row navbar">
                        <div className="col-md-12">
                            <div className="app-tittel">
                                <img className="logo-header" src="/ledeteksteditor/img/hvit-logo.svg" alt="NAV logo" />
                                <span className="typo-element">Ledeteksteditor</span>
                            </div>
                            {hentLoggInnInfo(loggInnData)}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

HeaderInfo.propTypes = {
    loggInnData: PT.object.isRequired
};

export default HeaderInfo;
