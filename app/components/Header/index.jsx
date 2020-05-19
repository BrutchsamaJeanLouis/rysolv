import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({
  activeUser,
  dispatchFetchWatchList,
  handleNav,
  handleSignin,
  handleSignout,
  isSignedIn,
  view,
}) => {
  const isMobile = view === 'mobile';
  return (
    <ConditionalRender
      Component={MobileHeader}
      FallbackComponent={DesktopHeader}
      propsToPassDown={{
        activeUser,
        dispatchFetchWatchList,
        handleNav,
        handleSignin,
        handleSignout,
        isMobile,
        isSignedIn,
        view,
      }}
      shouldRender={isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object,
  dispatchFetchWatchList: T.func,
  handleNav: T.func,
  handleSignin: T.func,
  handleSignout: T.func,
  isSignedIn: T.bool,
  view: T.string,
};

export default Header;
