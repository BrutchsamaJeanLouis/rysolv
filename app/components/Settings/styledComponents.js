import React from 'react';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { BaseDropDownMenu, ErrorSuccessBanner } from 'components/base_ui';
import {
  defaultFontSize,
  headerColor,
  lightBlueColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const DetailContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DetailViewContainer = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  padding: 1.6rem 0;
  width: 100%;

  ${mobile} {
    flex-direction: column;
  }
`;

export const EditUserImageWrapper = styled.div`
  position: relative;
`;

export const EmptyComponentContainer = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 30rem;
  justify-content: center;
  text-align: center;
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IconButtonContainer = styled.div`
  align-self: center;
  height: 100%;
`;

export const IconButtonGroup = styled.div`
  display: flex;
`;

export const InputIconGroup = styled.label`
  align-items: center;
  background-color: white;
  border-radius: 2rem;
  border: 0.2rem solid ${lightBlueColor};
  bottom: -1rem;
  color: ${lightBlueColor};
  display: flex;
  height: 4rem;
  justify-content: center;
  padding: 1rem 0;
  position: absolute;
  right: -1rem;
  width: auto;

  &:hover {
    background-color: white;
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const Language = styled.div`
  align-items: center;
  display: flex;
  flex-flow: wrap;
`;

export const LanguageListItem = styled.div`
  display: flex;
  font-size: ${defaultFontSize};
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const LinkIcon = styled.div`
  padding-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const LinksWrapper = styled.div`
  color: #6a737d;
  font-size: ${defaultFontSize};
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const Name = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

export const OneLink = styled.div`
  align-items: center;
  display: flex;
`;

export const OneLinkWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const Rep = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
`;

export const SettingsTabsWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  margin-left: 2rem;
  overflow: hidden;
  padding: 2rem;
  width: 100%;

  ${mobile} {
    margin-left: 0;
    margin-top: ${({ displayBottom }) => (displayBottom ? '0' : '2rem')};
  }
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledBaseDropDownMenu = styled(BaseDropDownMenu)`
  margin: 0 1rem;

  ${mobile} {
    margin-right: 0;
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-top: 1.6rem;
  width: 100%;
`;

export const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);

  &:before {
    background-color: white;
  }

  &.expanded {
    margin: 0rem;
  }

  .MuiExpansionPanelSummary-root {
    margin: 0;
    padding: 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  justify-content: center;
  padding: 0;
  width: 100%;
`;

export const StyledH3 = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 3rem 0;
`;

export const StyledLanguageAutocomplete = styled.div`
  width: 80%;
`;

export const StyledPaper = styled(Paper)`
  box-shadow: none;
  width: 100%;
`;

export const StyledPopper = styled(Popper)`
  background: #37474f;
  border-radius: 0.2rem;
  padding: 1rem;
  top: -0.2rem !important;
`;

export const StyledTab = styled(Tab)`
  font-size: ${defaultFontSize};
  min-width: fit-content;
  padding: 0.6rem;

  &.selected {
    color: ${headerColor};
  }

  .MuiTab-wrapper {
    white-space: nowrap;
  }
`;

export const StyledTabs = styled(({ displayBottom, ...restProps }) => (
  <Tabs {...restProps} />
))`
  ${mobile} {
    display: ${({ displayBottom }) => (displayBottom ? 'none' : 'flex')};
  }

  .indicator {
    background-color: ${headerColor};
  }

  .MuiTabs-centered {
    justify-content: end;
  }
`;

export const TabItem = styled.div`
  color: #f6f8fa;
  font-size: 1.4rem;
  padding: 0.5rem 0;
`;

export const TabItemBorder = styled.div`
  border-bottom: ${({ isActive }) =>
    isActive ? '0.2rem solid #f6f8fa' : 'none'};

  &:hover {
    cursor: pointer;
    border-bottom: 0.2rem solid #f6f8fa;
  }
`;

export const UserCardWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 15px 2%;
  width: fit-content;

  ${mobile} {
    display: ${({ displayBottom }) => (displayBottom ? 'none' : 'flex')};
    width: 100%;
  }
`;

export const UserImage = styled.img`
  height: 25rem;
  margin: 0.5rem;
  object-fit: cover;
  width: 25rem;

  ${mobile} {
    align-self: center;
  }
`;
