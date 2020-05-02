import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { Upvote } from 'components/base_ui';
import { StyledFlatIconButton } from 'components/Issues/Card/styledComponents';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  IssueAttempts,
  IssueContent,
  IssueContentInfo,
  IssueDetail,
  IssueFundedAmount,
  IssueListItem,
  IssueModifiedDate,
  IssueName,
  IssueNameWrapper,
  IssueOpen,
  IssueOpenWrapper,
  IssuesList,
  StyledUpvotePanel,
} from '../styledComponents';

const OrganizationIssuesTab = ({ handleNav, handleUpvote, issues }) => (
  <IssuesList>
    {issues.map(({ id, attempting, modifiedDate, name, open, rep, value }) => (
      <IssueListItem key={`list-item-${id}`}>
        <IssueContent>
          <StyledUpvotePanel>
            <StyledFlatIconButton
              Icon={<Upvote />}
              onClick={() => handleUpvote({ itemId: id })}
            />
            {rep}
          </StyledUpvotePanel>
          <IssueContentInfo>
            <IssueModifiedDate>
              {moment.utc(modifiedDate).fromNow()}
            </IssueModifiedDate>
            <IssueDetail>
              <IssueNameWrapper>
                <IssueName
                  onClick={() => handleNav(`/admin/issues/detail/${id}`)}
                >
                  {name}
                </IssueName>
                <IssueOpenWrapper>
                  <IssueOpen open={open}>
                    {open ? 'Funded' : 'Unfunded'}
                  </IssueOpen>
                  <IssueAttempts>{attempting.length} Attempts</IssueAttempts>
                </IssueOpenWrapper>
              </IssueNameWrapper>
              <IssueFundedAmount>{formatDollarAmount(value)}</IssueFundedAmount>
            </IssueDetail>
          </IssueContentInfo>
        </IssueContent>
      </IssueListItem>
    ))}
  </IssuesList>
);

OrganizationIssuesTab.propTypes = {
  issues: T.array,
  handleNav: T.func,
  handleUpvote: T.func,
};

export default OrganizationIssuesTab;
