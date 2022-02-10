import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import NotFoundPage from 'components/NotFoundPage';
import UserProfileComponent from 'components/UserProfile';
import { makeSelectAuth } from 'containers/Auth/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchUserProfile } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectUserProfile,
  makeSelectUserProfileParams,
} from './selectors';
import { ViewContainer } from './styledComponents';

const UserProfile = ({
  activeUser,
  deviceView,
  dispatchFetchUserProfile,
  error,
  handleNav,
  isSignedIn,
  loading,
  params,
  user,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchFetchUserProfile({ username: params });
  }, []);

  useEffect(() => {
    if (user.username) document.title = user.username;
  }, [user]);

  const ViewToRender = user.company ? NotFoundPage : UserProfileComponent;

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={user}
        component={ViewToRender}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{ activeUser, deviceView, handleNav, isSignedIn }}
      />
    </ViewContainer>
  );
};

UserProfile.propTypes = {
  activeUser: T.object,
  deviceView: T.string.isRequired,
  dispatchFetchUserProfile: T.func.isRequired,
  error: T.string,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  loading: T.bool.isRequired,
  params: T.string.isRequired,
  user: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /*
   * Reducer : UserProfile
   */
  error: makeSelectUserProfile('error'),
  loading: makeSelectUserProfile('loading'),
  params: makeSelectUserProfileParams(),
  user: makeSelectUserProfile('user'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : User Profile
     */
    dispatchFetchUserProfile: payload => dispatch(fetchUserProfile(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserProfile);
