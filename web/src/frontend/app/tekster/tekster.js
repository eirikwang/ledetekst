import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lastInnTekster } from './tekster-reducer';
import InnholdsLaster from './../felles/innholdslaster/innholdslaster';
import TeksterListe from './tekster-liste';

/**
 * Den smarte komponenten for tekster-modulen. Merk oppdeling: Hver funksjonell modul har
 * en smart komponent, actions/reducers og en/flere dumme komponenter. Actions/Reducers og
 * react-komponenter er -ikke- gruppert sammen over flere funksjonelle moduler
 */

class Tekster extends Component {
    componentWillMount() {
        this.props.actions.lastInnTekster();
    }
    render() {
        return (
            <InnholdsLaster avhengigheter={[this.props.tekster]}>
                <TeksterListe tekster={this.props.tekster} />
            </InnholdsLaster>
        );
    }
}

Tekster.propTypes = {
    tekster: PT.object.isRequired,
    actions: PT.shape({
        lastInnTekster: PT.func.isRequired
    })
};

function mapStateToProps({ tekster }) {
    return { tekster };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ lastInnTekster }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tekster);
