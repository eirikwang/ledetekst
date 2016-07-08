import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { fetchTekster } from './tekster/tekster-actions';
import { bindActionCreators } from 'redux';
import Innholdslaster from './felles/innholdslaster/innholdslaster';
import DevTools from './devtools';
import HeaderInfo from './headerinfo/headerinfo';

class Application extends Component {
    componentWillMount() {
        this.props.actions.fetchTekster();
    }
    render() {
        const { tekster } = this.props;
        return (
            <div>
                <HeaderInfo loggInnData={this.props.loggInnData} />
                <div className="container">
                    <Innholdslaster avhengigheter={[tekster]}>
                        {this.props.children}
                    </Innholdslaster>
                    <DevTools />

                </div>
            </div>
        );
    }
}

Application.propTypes = {
    tekster: PT.object.isRequired,
    children: PT.object.isRequired,
    loggInnData: PT.object.isRequired,
    actions: PT.shape({
        fetchTekster: PT.func.isRequired
    })
};

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ fetchTekster }, dispatch) };
}
export default connect(state => ({ tekster: state.tekster, loggInnData: state.autentisert.data }),
    mapDispatchToProps
)(Application);
