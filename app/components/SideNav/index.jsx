import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { excludedPath, getInitialValue } from './helpers';
import {
  FixedWrapper,
  StyledIconButton,
  StyledListWrapper,
  StyledSideNav,
} from './styledComponents';
const addIcon = iconDictionary('addCircle');
const backArrow = iconDictionary('backArrowHalf');
const forwardArrow = iconDictionary('forwardArrowHalf');
const issueIcon = iconDictionary('issue');
const organizationIcon = iconDictionary('organization');
const userIcon = iconDictionary('user');
const uploadIcon = iconDictionary('upload');

const SideNav = ({ handleNav, view }) => {
  const path = window.location.pathname;
  const formattedPath = path.replace(/^\/+/, '');

  const [open, setOpen] = useState(true);
  const [currentValue, setCurrentValue] = useState(0);
  const [displaySideNav, setDisplaySideNav] = useState(
    !excludedPath.includes(formattedPath),
  );

  useEffect(() => {
    const { initialValue } = getInitialValue[formattedPath] || 0;
    setCurrentValue(initialValue);
    switch (view) {
      case 'desktop':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'laptop':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        break;
      case 'tablet':
        setDisplaySideNav(false);
        break;
      case 'mobileL':
        setDisplaySideNav(false);
        break;
      case 'mobileS':
        setDisplaySideNav(false);
        break;
      default:
        break;
    }
  }, [view, path]);

  useEffect(() => {
    if (view === 'desktop') setOpen(true);
    else setOpen(false);
  }, [view]);

  const handleClick = (route, tab) => {
    handleNav(route);
    setCurrentValue(tab);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const SideNavComponent = (
    <FixedWrapper open={open}>
      <StyledSideNav open={open}>
        <List>
          <StyledListWrapper active={currentValue === 0}>
            <ListItem
              button
              key="Issues"
              onClick={() => handleClick('/issues', 0)}
            >
              <ListItemIcon>{issueIcon}</ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 1}>
            <ListItem
              button
              key="Organizations"
              onClick={() => handleClick('/organizations', 1)}
            >
              <ListItemIcon>{organizationIcon}</ListItemIcon>
              <ListItemText primary="Organizations" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 2}>
            <ListItem
              button
              key="Users"
              onClick={() => handleClick('/users', 2)}
            >
              <ListItemIcon>{userIcon}</ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </StyledListWrapper>
          <Divider />
          <StyledListWrapper active={currentValue === 3}>
            <ListItem
              button
              key="addIssues"
              onClick={() => handleClick('/issues/add', 3)}
            >
              <ListItemIcon>{uploadIcon}</ListItemIcon>
              <ListItemText primary="New Issue" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 4}>
            <ListItem
              button
              key="addOrganizations"
              onClick={() => handleClick('/organizations/add', 4)}
            >
              <ListItemIcon>{addIcon}</ListItemIcon>
              <ListItemText primary="New Organization" />
            </ListItem>
          </StyledListWrapper>
        </List>
        <Divider />
        <StyledIconButton disableRipple onClick={toggleDrawer} open>
          {open ? backArrow : forwardArrow}
        </StyledIconButton>
      </StyledSideNav>
    </FixedWrapper>
  );

  return (
    <ConditionalRender
      Component={SideNavComponent}
      shouldRender={displaySideNav}
    />
  );
};

SideNav.propTypes = {
  handleNav: T.func,
  view: T.string,
};

export default SideNav;
