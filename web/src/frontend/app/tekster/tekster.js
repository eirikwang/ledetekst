import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTekster } from './tekster-actions';
import Innholdslaster from '../felles/innholdslaster/innholdslaster';

class Tekster extends Component {
    componentWillMount() {
        this.props.actions.fetchTekster(this.props.params.applikasjon);
    }

    render() {
        const { tekster, children } = this.props;

        return (
            <Innholdslaster avhengigheter={[tekster]}>
                {children}
            </Innholdslaster>
        );
    }
}

Tekster.propTypes = {
    params: PT.object.isRequired,
    tekster: PT.object.isRequired,
    children: PT.object.isRequired,
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
