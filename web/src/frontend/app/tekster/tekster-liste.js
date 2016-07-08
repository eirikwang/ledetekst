import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { storeShape } from './../felles/proptype-shapes';
import RedigerLink from './../redigerlink/redigerlink';

function Tekster({ tekster, base }) {
    const hentInnholdFor = (ledetekst) =>
        <ul type="disc">
            {Object.keys(ledetekst.spraak).map((spraak) =>
                <li key={spraak}>
                    <RedigerLink base={base} nokkel={ledetekst.nokkel} spraak={spraak} />: {ledetekst.spraak[spraak]}
                </li>)}
        </ul>;


    const teksterElement = tekster.data.map((ledetekst) =>
        <li key={ledetekst.nokkel} className="blokk-s">
            <div className="typo-element">{ledetekst.nokkel}</div>
            Språk
            {hentInnholdFor(ledetekst)}
        </li>
    );

    return (
        <div>
            <h1 className="typo-sidetittel text-center">Ledertekster</h1>
            <ul className="tekster">
                {teksterElement}
            </ul>
        </div>
    );
}

Tekster.propTypes = {
    tekster: storeShape(PT.object).isRequired,
    base: PT.string.isRequired
};
function mapStateToProps({ tekster }, ownProps) {
    return { tekster, base: ownProps.location.pathname };
}
export default connect(mapStateToProps)(Tekster);
