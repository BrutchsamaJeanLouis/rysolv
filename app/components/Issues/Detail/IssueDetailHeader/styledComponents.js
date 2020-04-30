import styled from 'styled-components';

import {
  darkTextColor,
  textColor,
  headerFontSize,
  detailFontSize,
} from 'defaultStyleHelper';

export const IssueDetailTopBar = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  margin: 0 0 0 0;
  padding: 0.5rem 0;
`;

export const IssueSubHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IssueSubItem = styled.div`
  color: ${textColor};
  font-size: ${detailFontSize};
  margin: 0 1rem 0 1rem;
`;

export const NameWrapper = styled.div`
  color: ${darkTextColor};
  font-size: ${headerFontSize};
  margin: 1rem 0;
`;

export const OrganizationNameWrapper = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-weight: bold;
`;

export const StyledIssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  font-size: ${detailFontSize};
  width: 100%;
`;

export const StyledVerified = styled.div`
  padding: 0 0.5rem;
`;
