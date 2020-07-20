import React, { useEffect } from 'react';
import T from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ConditionalRender, LoadingIndicator } from 'components/base_ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { makeSelectAuth, makeSelectAuthLoading } from './selectors';
import { fetchUserSession, signIn, signUp } from './actions';

export default function withAuth(config, Component) {
  const Auth = ({
    authenticateLoading,
    dispatchFetchUserSession,
    handleSignIn,
    handleSignUp,
    isSignedIn,
    ...restProps
  }) => {
    const { isPrivate } = config;

    useEffect(() => {
      dispatchFetchUserSession();
    }, []);

    if (!isSignedIn && isPrivate && !authenticateLoading)
      return <Redirect to="/signin" />;

    return (
      <ConditionalRender
        Component={Component}
        FallbackComponent={LoadingIndicator}
        propsToPassDown={{ ...restProps }}
        shouldRender={!authenticateLoading}
      />
    );
  };

  Auth.propTypes = {
    authenticateLoading: T.bool,
    dispatchFetchUserSession: T.func,
    handleSignIn: T.func,
    handleSignUp: T.func,
    isSignedIn: T.bool,
  };

  const mapStateToProps = createStructuredSelector({
    /**
     * Reducer: Auth
     */
    authenticateLoading: makeSelectAuthLoading('authenticateUser'),
    isSignedIn: makeSelectAuth('isSignedIn'),
  });

  const mapDispatchToProps = dispatch => ({
    /**
     * Auth
     */
    dispatchFetchUserSession: () => dispatch(fetchUserSession()),
    handleSignIn: payload => dispatch(signIn(payload)),
    handleSignUp: payload => dispatch(signUp(payload)),
  });

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  const withReducer = injectReducer({ key: 'auth', reducer });
  const withSaga = injectSaga({ key: 'auth', saga });

  return withRouter(
    compose(
      withReducer,
      withSaga,
      withRouter,
      withConnect,
    )(Auth),
  );
}
