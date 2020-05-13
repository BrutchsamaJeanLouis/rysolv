import styled from 'styled-components';

import {
  detailFontSize,
  hoverLinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';

export const IssueCardIconWrapper = styled.div`
  display: inline-flex;
  margin: 0 0.5rem;
`;

export const IssueCardItem = styled.div`
  display: inline-flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const IssueCardLabelWrapper = styled.div`
  display: inline-flex;
`;

export const IssueLanguageContainer = styled.div`
  margin: 1rem 0;
  font-size: ${detailFontSize};
`;

export const NameWrapper = styled.a`
  font-size: ${subheaderFontSize};
  overflow: hidden;
  color: ${textColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const OrganizationNameWrapper = styled.a`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-weight: bold;
`;

export const StyledIssueContent = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 0.2rem;
`;

export const StyledIssueFooter = styled.div`
  display: flex;
  justify-content: ${props => (props.open ? 'space-between' : 'flex-end')};
  font-size: ${detailFontSize};
  color: ${textColor};
  padding: 0.5rem 3rem 0.25rem 0;
`;

export const StyledIssueHeader = styled.div`
  width: 100%;
  font-size: ${detailFontSize};

  padding: 0.25rem 1rem 0 0.25rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledIssueText = styled.div`
  padding: 0 1rem 0 0;
  height: auto;
  min-height: 6rem;
`;

export const StyledListItem = styled.li`
  display: flex;
  border-radius: 2px;
  overflow: hidden;
  margin: 0 1rem 1rem 1rem;
  flex-direction: row;
  list-style-type: none;
`;

export const StyledVerified = styled.div`
  padding: 0 0.5rem;
`;
