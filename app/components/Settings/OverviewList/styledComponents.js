import styled from 'styled-components';

import { defaultFontSize, hoverLinkColor, textColor } from 'defaultStyleHelper';

export const EmptyOverviewListDetail = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  height: 100%;
  margin: 2rem 0;
  width: 100%;
`;

export const EmptyOverviewListItem = styled.div`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  text-align: center;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const IssueFundedAmount = styled.div`
  align-self: center;
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  justify-content: flex-end;
  width: 30%;
`;

export const IssueName = styled.a`
  font-size: 1.4rem;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const IssueNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 1.5rem;
`;

export const OverviewList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const OverviewListDetail = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  height: 100%;
  margin: 1rem 0;
`;

export const OverviewListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  width: 90%;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;
