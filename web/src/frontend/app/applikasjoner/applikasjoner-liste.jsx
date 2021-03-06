import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';
import { Link } from 'react-router';
function ApplikasjonerListe({ applikasjoner }) {
    const apps = applikasjoner.data.map((app) =>
        <li key={app.id} className="">
            <Link
                to={`/tekster/${app.id}`}
                className="panel panel-ramme panel-klikkbart panel-komprimert panel-tilpasset "
            >
                <h2 className="typo-etikett-stor">{app.navn}</h2>
                <p className="typo-normal blokk-xxxs">{app.url}</p>
            </Link>
        </li>
    );
    return (
        <div>
            <h1 className="typo-sidetittel text-center blokk-l hode-dekorert">Applikasjoner</h1>
            <ul className="ustilet">
                {apps}
            </ul>
        </div>
    );
}

ApplikasjonerListe.propTypes = {
    applikasjoner: storeShape(PT.object).isRequired
};

export default ApplikasjonerListe;
