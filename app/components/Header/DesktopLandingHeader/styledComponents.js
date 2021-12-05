import styled from 'styled-components';

import {
  BaseLink,
  PrimaryButton,
  SecondaryButton,
  UserNavBar,
} from 'components/base_ui';
import {
  blueColor,
  blueGrayColor,
  darkBlueColor,
  whiteColor,
} from 'defaultStyleHelper';

export const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const ComponentContainer = styled.div`
  background: ${blueColor};
`;

export const DesktopHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 120rem;
  padding: 2rem 12rem;
`;

export const InternalLink = styled(BaseLink)`
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding-right: 2.2rem;

  &:hover {
    color: ${whiteColor};
  }
`;

export const Logo = styled.div`
  background: white;
  border-radius: 50%;
  height: 4rem;
  margin-right: 1rem;
  text-align: center;
  width: 4rem;

  svg {
    height: 100%;
    width: 2.5rem;
  }
`;

export const LogoWrapper = styled.div`
  align-items: center;
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

export const MessageLink = styled(BaseLink)`
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding-right: 0.5rem;

  &:hover {
    color: ${whiteColor};
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: ${darkBlueColor};
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4rem;
  text-transform: none;
  width: 10.7rem;

  &:hover {
    background: ${darkBlueColor};
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background: ${whiteColor};
  color: ${darkBlueColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4rem;
  text-transform: none;
  width: 10.7rem;

  &:hover {
    background: ${whiteColor};
  }
`;

export const StyledUserNavBar = styled(UserNavBar)`
  background-color: ${blueGrayColor};
  border: 0.2rem solid ${darkBlueColor};
  color: ${whiteColor};
  font-size: 1.6rem;
  margin: 0 0 0 2.2rem;

  img {
    height: 4rem;
    width: 4rem;
  }

  &:hover {
    border-color: ${darkBlueColor};
  }
`;

export const UnreadMessages = styled.div`
  background-color: white;
  border-radius: 50%;
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.9rem;
  min-width: 1.9rem;
  text-align: center;
`;

export const VerticalDivider = styled.div`
  background: ${whiteColor};
  border: 0.2rem solid ${whiteColor};
  height: 0rem;
  transform: rotate(90deg);
  width: 2.1rem;
`;

export const Wordmark = styled.div`
  svg {
    height: 3rem;
    width: auto;
  }
`;
