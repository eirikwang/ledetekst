import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTekster } from './tekster-actions';
import InnholdsLaster from './../felles/innholdslaster/innholdslaster';
import TeksterListe from './tekster-liste';

class Tekster extends Component {
    componentWillMount() {
        this.props.actions.fetchTekster();
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
        fetchTekster: PT.func.isRequired
    })
};

function mapStateToProps({ tekster }) {
    return { tekster };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ fetchTekster }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tekster);
