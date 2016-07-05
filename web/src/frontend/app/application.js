import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { fetchTekster } from './tekster/tekster-actions';
import { bindActionCreators } from 'redux';
import Innholdslaster from './felles/innholdslaster/innholdslaster';
import DevTools from './devtools';

class Application extends Component {
    componentWillMount() {
        this.props.actions.fetchTekster();
    }
    render() {
        const { tekster } = this.props;
        return (
            <div className="container">
                <Innholdslaster avhengigheter={[tekster]}>
                    {this.props.children}
                </Innholdslaster>
                <DevTools />
            </div>
        );
    }
}

Application.propTypes = {
    tekster: PT.object.isRequired,
    children: PT.object.isRequired,
    actions: PT.shape({
        fetchTekster: PT.func.isRequired
    })
};

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ fetchTekster }, dispatch) };
}
export default connect(state => ({ tekster: state.tekster }),
    mapDispatchToProps
)(Application);
