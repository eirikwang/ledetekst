import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { loggUt } from './../logginn/logginn-actions';
import { Link } from 'react-router';

export function Header({ loggInnData, handleClick, pathname }) {
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

    function visAppOversiktLink() {
        if (pathname === '/') {
            return (
                <noscript>Du er allerede på startsiden</noscript>
            );
        }
        return (
            <div className="til-appoversikt">
                <img className="pil-tilbake" src="/ledeteksteditor/img/pil-tilbake.svg" alt="Tilbake-ikon" />
                <Link to="/" className="typo-undertekst hvit-link"> Til applikasjonsoversikt</Link>
            </div>
        );
    }

    return (
        <header className="siteheader blokk-xl" role="banner">
            <div className="site-coltrols-toolbar site-controls-toolbar">
                <div className="container">
                    <div className="row navbar">
                        <div className="col-md-12">
                            {visAppOversiktLink()}
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

Header.propTypes = {
    handleClick: PT.func.isRequired,
    loggInnData: PT.object.isRequired,
    pathname: PT.string.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        handleClick: () => {
            dispatch(loggUt());
            window.location.reload();
        }
    };
}

function mapStateToProps(state) {
    return {
        loggInnData: state.autentisert.data,
        pathname: state.header.pathname
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
