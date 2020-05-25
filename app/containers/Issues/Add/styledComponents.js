import styled from 'styled-components';
import {
  borderColor,
  defaultFontSize,
  headerFontSize,
  hoverLinkColor,
  hyperlinkColor,
  subHeaderColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';
const { desktop, laptop, tablet, mobile } = mediaQueriesByDevice;

export const AddWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 2.5%;
  width: 100%;
`;

export const AddForm = styled.div`
  background-color: white;
  border: 0.1rem solid ${borderColor};
  width: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
  ${desktop} {
    width: 80%;
  }
  ${laptop} {
    width: 90%;
  }
  ${tablet} {
    width: 100%;
  }
  ${mobile} {
    width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const LogoContainer = styled.img`
  display: inline-flex;
  margin: 0 1rem 0 0;
  width: 5rem;
  height: 5rem;
`;

export const OrganizationNameWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
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
  padding: 0 2rem;
`;

export const StyledLink = styled.a`
  font-size: ${defaultFontSize};
  color: ${hyperlinkColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;
