import styled, { css } from 'styled-components';

import { PrimaryAsyncButton, PrimaryButton } from 'components/base_ui';
import {
  blueColor,
  darkBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 0;
  text-transform: initial;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const ModalContainer = styled.div`
  padding: 2rem;
  width: 50rem;

  @media (max-width: 560px) {
    width: auto;
  }
`;

export const StyledBodyMessage = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  padding: 0.8rem 0 1.6rem;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-left: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${whiteColor};
  border: 0.2rem solid ${darkBlueColor};
  color: ${darkBlueColor};
  margin-right: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledTitle = styled.h3`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin: 0;
  padding: 2rem 0 1rem;
`;
