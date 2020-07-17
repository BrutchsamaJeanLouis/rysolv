import styled from 'styled-components';

import { PrimaryAsyncButton } from 'components/base_ui';
import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  hyperlinkColor,
  redText,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const EmailWrapper = styled.span`
  color: ${hyperlinkColor};
`;

export const ErrorWrapper = styled.div`
  color: ${redText};
  font-style: italic;
  padding: 1rem 0.5rem 2rem 0.5rem;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;

  ${mobile} {
    flex-direction: column;
  }
`;

export const InputFormWrapper = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 5rem;
  width: 50rem;

  ${mobile} {
    width: 100%;
  }
`;

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  align-self: center;
  min-width: 50%;
  width: fit-content;
`;

export const SubText = styled.div`
  font-size: ${detailFontSize};
  margin: 1rem 0;
  text-align: center;

  a {
    color: ${hyperlinkColor};
    :hover {
      color: ${hoverLinkColor};
    }
  }
`;

export const Title = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin: 0 0 3rem 0;
`;

export const VerificationWrapper = styled.div`
  align-self: center;
  display: flex;
  width: 60%;
`;
