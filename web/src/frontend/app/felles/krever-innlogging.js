import React, { PropTypes, Component } from 'react';
import { InnloggingsStatus } from '../logginn/logginn-actions';
import { autobind } from './utils';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function mapStateToProps(state) {
    return {
        loggetInn: state.autentisert.status === InnloggingsStatus.LOGGET_INN
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirectTilLogin: (next) => {
            dispatch(replace(next));
        }
    };
}

export default function kreverInnlogging(ComposedComponent) {
    class KreverInnlogging extends Component {
        constructor(props) {
            super(props);
            autobind(this);
        }

        componentWillMount() {
            if (!this.props.loggetInn) {
                this.props.redirectTilLogin({
                    pathname: '/login',
                    state: {
                        pathname: this.props.location.pathname,
                        query: this.props.location.query
                    }
                });
            }
        }

        render() {
            return this.props.loggetInn ? <ComposedComponent {...this.props} {...this.state} /> : null;
        }
    }

    KreverInnlogging.displayName = `KreverInnlogging(${getDisplayName(ComposedComponent)})`;
    KreverInnlogging.ComposedComponent = ComposedComponent;

    KreverInnlogging.propTypes = {
        redirectTilLogin: PropTypes.func.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string,
            query: PropTypes.object
        }),
        loggetInn: PropTypes.bool.isRequired
    };

    return connect(mapStateToProps, mapDispatchToProps)(KreverInnlogging);
}
