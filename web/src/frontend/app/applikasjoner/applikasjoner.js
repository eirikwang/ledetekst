import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { fetchApplikasjoner } from './applikasjoner-actions';
import { bindActionCreators } from 'redux';
import Innholdslaster from '../felles/innholdslaster/innholdslaster';
import ApplikasjonerListe from './applikasjoner-liste';

class Applikasjoner extends Component {
    componentWillMount() {
        this.props.actions.fetchApplikasjoner();
    }

    render() {
        const { applikasjoner } = this.props;
        return (
            <Innholdslaster avhengigheter={[applikasjoner]}>
                <ApplikasjonerListe applikasjoner={applikasjoner} />
            </Innholdslaster>
        );
    }
}
Applikasjoner.propTypes = {
    applikasjoner: PT.object.isRequired,
    actions: PT.shape({
        fetchApplikasjoner: PT.func.isRequired
    })
};

function mapStateToProps({ applikasjoner }) {
    return { applikasjoner };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ fetchApplikasjoner }, dispatch) };
}


export default connect(mapStateToProps, mapDispatchToProps)(Applikasjoner);
