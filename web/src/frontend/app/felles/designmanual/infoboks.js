import React, { PropTypes as PT } from 'react';

function Infoboks({ tittel, children, type }) {
    if (tittel) {
        return (
            <div className="panel panel-ramme">
                <div className={`hode hode-${type} hode-undertittel hode-dekorert blokk`}>
                    {tittel}
                </div>
                {children}
            </div>
        );
    }
    return (
        <div className="panel panel-ramme panel-komprimert">
            <div className="infoboks-adskilt-vertikalt">
                <div className="infoboks-adskilt-venstre">
                    <div className={`hodeblokk hode-${type}`}>
                        <span className={`hode hode-${type}`}></span>
                    </div>
                </div>

                <div className="infoboks-adskilt-hoyre">
                    {children}
                </div>
            </div>
        </div>
    );
}

Infoboks.propTypes = {
    tittel: PT.node,
    children: PT.node.isRequired,
    type: PT.string.isRequired
};

export default Infoboks;
