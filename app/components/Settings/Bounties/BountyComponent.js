import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { RewardWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AcceptButton,
  BountyContent,
  BountyContentInfo,
  BountyDetail,
  BountyList,
  BountyListItem,
  CreatedDate,
  IssueName,
  IssueNameWrapper,
  LinkWrapper,
  StyledExternalLink,
} from './styledComponents';

const CodeIcon = iconDictionary('code');

const BountyComponent = ({
  bounties,
  dispatchAcceptBounty,
  dispatchOpenModal,
  handleNav,
}) => (
  <BountyList>
    {bounties.map(
      ({
        createdDate,
        fundedAmount,
        id,
        issueId,
        name,
        pullRequestUrl,
        repoName,
        repoPayoutExists,
        userAccepted,
      }) => {
        const handleClick = () => {
          if (repoPayoutExists) {
            dispatchOpenModal({
              bounty: fundedAmount,
              fundingId: id,
              modalState: 'acceptBounty',
              repoName,
            });
          } else {
            dispatchAcceptBounty({ fundingId: id, userRatio: 1 });
          }
        };
        return (
          <BountyListItem key={`list-item-${id}`}>
            <BountyContent>
              <BountyContentInfo>
                <CreatedDate>{moment.utc(createdDate).fromNow()}</CreatedDate>
                <BountyDetail>
                  <IssueNameWrapper>
                    <IssueName
                      onClick={() => handleNav(`/issues/detail/${issueId}`)}
                    >
                      {name}
                    </IssueName>
                    <LinkWrapper>
                      {CodeIcon}
                      <StyledExternalLink href={pullRequestUrl} target="_blank">
                        View pull request
                      </StyledExternalLink>
                    </LinkWrapper>
                  </IssueNameWrapper>
                  {userAccepted ? (
                    <RewardWrapper fundedAmount={fundedAmount} />
                  ) : (
                    <AcceptButton
                      label="Accept Bounty"
                      onClick={() => handleClick()}
                    />
                  )}
                </BountyDetail>
              </BountyContentInfo>
            </BountyContent>
          </BountyListItem>
        );
      },
    )}
  </BountyList>
);

BountyComponent.propTypes = {
  bounties: T.array.isRequired,
  dispatchAcceptBounty: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default BountyComponent;
