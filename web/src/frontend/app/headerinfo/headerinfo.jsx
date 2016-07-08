import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { loggUt } from './../logginn/logginn-actions';

export function HeaderInfo({ loggInnData, handleClick }) {
    function hentLoggInnInfo() {
        if (!loggInnData.navn) {
            return (
                <noscript>Du er ikke logget inn</noscript>
            );
        }
        return (
            <div className="logginn-info">
                <span className="typo-undertekst">Du er logget inn som {loggInnData.navn} </span>
                <button className="knapp knapp-hoved knapp-liten" onClick={handleClick}>Logg ut</button>
            </div>
        );
    }

    return (
        <header className="siteheader" role="banner">
            <div className="site-coltrols-toolbar site-controls-toolbar">
                <div className="container">
                    <div className="row navbar">
                        <div className="col-md-12">
                            <div className="til-appoversikt">
                                <img className="pil-tilbake" src="/ledeteksteditor/img/pil-tilbake.svg" alt="Tilbake-knapp" />
                                <span className="typo-undertekst"> Til applikasjonsoversikt</span>
                            </div>
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
    handleClick: PT.func.isRequired,
    loggInnData: PT.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        handleClick: () => {
            dispatch(loggUt());
        }
    };
}

function mapStateToProps(state) {
    return {
        loggInnData: state.autentisert.data
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderInfo);
