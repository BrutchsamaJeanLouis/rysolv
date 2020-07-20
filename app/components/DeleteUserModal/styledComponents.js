import styled from 'styled-components';

import { buttonRed, defaultFontSize, textColor } from 'defaultStyleHelper';
import { PrimaryAsyncButton, PrimaryButton } from 'components/base_ui';

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const DeleteUserContainer = styled.div`
  padding: 2rem;
`;

export const StyledBodyMessage = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 2rem 0;
  text-align: justify;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  background-color: ${buttonRed};

  &:hover {
    background-color: ${buttonRed};
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: #bdbdbd;

  &:hover {
    background-color: #bdbdbd;
  }
`;

export const StyledTitle = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;
