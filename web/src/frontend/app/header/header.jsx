import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { loggUt } from './../logginn/logginn-actions';
import { Link } from 'react-router';

export function Header({ loggInnData, handleLoggUtClick, pathname }) {
    function hentLoggInnInfo() {
        if (!loggInnData.navn) {
            return (
                <div className="logginn-info">
                    <button className="knapp knapp-hoved knapp-mini">Logg inn</button>
                </div>
            );
        }
        return (
            <div className="logginn-info">
                <span className="typo-undertekst logginn-tekst">{loggInnData.navn}</span>
                <button className="knapp knapp-hoved knapp-mini" onClick={handleLoggUtClick}>Logg ut</button>
            </div>
        );
    }

    function visAppOversiktLink() {
        if (pathname === '/' || pathname.indexOf('rediger') > -1 || pathname.indexOf('login') > -1) {
            return (
                <noscript>Du er allerede på startsiden eller på rediger-siden</noscript>
            );
        }
        return (
            <Link to="/" className="hvit-link">
                <div className="til-appoversikt">
                    <img className="pil-tilbake" src="/ledeteksteditor/img/pil-tilbake.svg" alt="Tilbake-ikon" />
                    <span className="typo-undertekst tekst-tilappoversikt">Til applikasjonsoversikt</span>
                </div>
            </Link>
        );
    }

    return (
        <header className="siteheader" role="banner">
            <div className="site-coltrols-toolbar site-controls-toolbar">
                <div className="container">
                    <div className="row navbar">
                        <div className="col-md-12">
                            {visAppOversiktLink()}
                            <div className="app-tittel">
                                <img className="logo-header" src="/ledeteksteditor/img/logo-nav.svg" alt="NAV logo" />
                                <span className="typo-element tittel-header">Ledeteksteditor</span>
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
    handleLoggUtClick: PT.func.isRequired,
    loggInnData: PT.object.isRequired,
    pathname: PT.string.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        handleLoggUtClick: () => {
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
