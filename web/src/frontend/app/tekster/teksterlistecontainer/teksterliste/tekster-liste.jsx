import React, { PropTypes as PT } from 'react';
import { storeShape } from './../../../felles/proptype-shapes';
import { Link } from 'react-router';

function TeksterListe({ tekster, base }) {
    const hentInnholdFor = (ledetekst) =>
        Object.keys(ledetekst.spraak).map((spraak) =>
            <Link className="tekst-link" to={`${base}/rediger?nokkel=${ledetekst.nokkel}&spraak=${spraak}`}>
                <div className="tekst-element blokk-xxxs">
                    <img className="tekst-ikon" src="/ledeteksteditor/img/ikon-tekst-copy.svg" alt="Tekst-ikon" />
                    <span className="typo-undertekst tekst-innhold">{ledetekst.spraak[spraak]}</span>
                    <span className="typo-undertekst tekst-nokkel">{ledetekst.nokkel}</span>
                    <span className="typo-etikett-liten tekst-spraak">{spraak}</span>
                    <span className="typo-etikett-liten tekst-sistendret">01.01.2000</span>
                </div>
            </Link>
        );

    const teksterElement = tekster.data.map((ledetekst) => hentInnholdFor(ledetekst));

    return (
        <div className="tekster">
            <div className="tittel-element blokk-xxxs">
                <span className="typo-etikett-liten tekst-tittel-innhold">Ledetekst</span>
                <span className="typo-etikett-liten tekst-tittel-nokkel">Id-nøkkel</span>
                <span className="typo-etikett-liten tekst-tittel-spraak">Språk</span>
                <span className="typo-etikett-liten tekst-tittel-sistendret">Redigert sist</span>
            </div>
            {teksterElement}
        </div>
    );
}

TeksterListe.propTypes = {
    tekster: storeShape(PT.object).isRequired,
    base: PT.string.isRequired
};

export default TeksterListe;
