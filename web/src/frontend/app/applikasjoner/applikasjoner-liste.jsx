import React, { PropTypes as PT } from 'react';
import { storeShape } from './../felles/proptype-shapes';
import { Link } from 'react-router';
function ApplikasjonerListe({ applikasjoner }) {
    const apps = applikasjoner.data.map((app) =>
        <li key={app.id}>
            <Link to={`/tekster/${app.id}`}>{app.navn}({app.url})</Link>
        </li>
    );
    return (
        <div>
            <h1 className="typo-sidetittel text-center">Applikasjoner</h1>
            <ul>
                {apps}
            </ul>
        </div>
    );
}

ApplikasjonerListe.propTypes = {
    applikasjoner: storeShape(PT.object).isRequired
};

export default ApplikasjonerListe;
