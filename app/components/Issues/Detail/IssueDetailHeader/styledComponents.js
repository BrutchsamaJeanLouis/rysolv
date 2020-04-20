import styled from 'styled-components';

import { darkTextColor, moneyGreen, textColor } from 'defaultStyleHelper';

export const IssueDetailTopBar = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  margin: 0 0 0 0;
  padding: 0.5rem 0;
`;

export const StyledIssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  width: 100%;
`;

export const OrganizationNameWrapper = styled.div`
  color: ${textColor};
  display: flex;
  display: inline-block;
  font-weight: bold;
`;

export const IssueLanguage = styled.div`
  color: #90a4ae;
  display: flex;
  display: inline-block;
  font-weight: bold;
`;

export const NameWrapper = styled.div`
  color: ${darkTextColor};
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0.5rem;
  max-height: 3rem;
`;

export const IssueResolved = styled.div`
  background-color: ${props => (props.open ? moneyGreen : 'grey')};
  border-color: ${props => (props.open ? '#b9f6ca' : 'grey')};
  border-radius: 5rem;
  border: 2px solid;
  color: white;
  display: inline-block;
  font-weight: bold;
  padding: 0.5rem;
`;

export const DollarWrapper = styled.div`
  background-color: ${moneyGreen};
  border-radius: 1rem;
  color: white;
  padding: 0.25rem 1rem 0.25rem 1rem;
  text-align: center;
`;

export const IssueSubHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const IssueSubItem = styled.div`
  color: ${textColor};
  margin: 0 1rem 0 1rem;
`;
