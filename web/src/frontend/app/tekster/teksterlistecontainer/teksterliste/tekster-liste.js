import React, { PropTypes as PT } from 'react';
import { storeShape } from './../../../felles/proptype-shapes';
// import RedigerLink from './../redigerlink/redigerlink';
import { Link } from 'react-router';

function TeksterListe({ tekster, base }) {
    const hentInnholdFor = (ledetekst) =>
        /*
        <ul type="disc">
            {Object.keys(ledetekst.spraak).map((spraak) =>
                <li key={spraak}>
                    <RedigerLink base={base} nokkel={ledetekst.nokkel} spraak={spraak} />: {ledetekst.spraak[spraak]}
                </li>)}
        </ul>;
        */
        Object.keys(ledetekst.spraak).map((spraak) =>
            <Link className="tekst-link" to={`${base}/rediger?nokkel=${ledetekst.nokkel}&spraak=${spraak}`}>
                <div className="tekst-element blokk-xxxs">
                    <img className="tekst-ikon" src="/ledeteksteditor/img/ikon-tekst-copy.svg" alt="Tekst-ikon" />
                    <span className="typo-avsnitt tekst-innhold">{ledetekst.spraak[spraak]}</span>
                    <span className="typo-undertekst tekst-nokkel">{ledetekst.nokkel}</span>
                    <span className="typo-etikett-liten tekst-spraak">{spraak}</span>
                    <span className="typo-etikett-liten tekst-sistendret">01.01.2000</span>
                </div>
            </Link>
        );


    const teksterElement = tekster.data.map((ledetekst) =>
        /*
        <li key={ledetekst.nokkel} className="blokk-s">
            <div className="typo-element">{ledetekst.nokkel}</div>
            Språk
            {hentInnholdFor(ledetekst)}
        </li>
        */
        hentInnholdFor(ledetekst)
    );

    return (
        <div>
            <h1 className="typo-sidetittel text-center">Ledetekster</h1>
            <ul className="tekster">
                {teksterElement}
            </ul>
        </div>
    );
}

TeksterListe.propTypes = {
    tekster: storeShape(PT.object).isRequired,
    base: PT.string.isRequired
};

export default TeksterListe;
