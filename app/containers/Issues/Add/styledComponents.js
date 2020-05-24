import styled from 'styled-components';

import {
  defaultFontSize,
  subHeaderColor,
  headerFontSize,
  borderColor,
  hyperlinkColor,
  hoverLinkColor,
} from 'defaultStyleHelper';

export const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  width: 100%;
`;

export const AddForm = styled.div`
  background-color: white;
  padding: 1rem 1rem 5rem 1rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const SelectedOrganization = styled.div`
  margin: 0.5rem 0;
  font-size: ${headerFontSize};
`;

export const StyledH3 = styled.h3`
  color: ${subHeaderColor};
  padding: 1rem 2rem;
  margin-bottom: 0;
`;

export const VerifyWrapper = styled.div`
  padding: 0 3rem;
`;

export const StyledLink = styled.a`
  font-size: ${defaultFontSize};
  color: ${hyperlinkColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;
