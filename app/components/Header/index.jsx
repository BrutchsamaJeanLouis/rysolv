import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({
  activeUser,
  deviceView,
  handleNav,
  handleResetState,
  handleSignin,
  handleSignout,
  isSignedIn,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile =
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  const { pathname } = window.location;
  const isLandingPage = pathname === '/';
  return (
    <ConditionalRender
      Component={DesktopHeader}
      FallbackComponent={MobileHeader}
      propsToPassDown={{
        activeUser,
        deviceView,
        handleNav,
        handleResetState,
        handleSignin,
        handleSignout,
        isDrawerOpen,
        isLandingPage,
        isMobile,
        isSignedIn,
        setIsDrawerOpen,
      }}
      shouldRender={!isMobile}
    />
  );
};

Header.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignin: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default Header;
