import React, { useState } from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import {
  ConditionalRender,
  ErrorSuccessBanner,
  IconToolTip,
  Upvote,
  CommentIcon,
  Verified,
} from 'components/base_ui';
import SettingsMenu from 'components/SettingsMenu';

import {
  BannerWrapper,
  StyledIssueCard,
  NameWrapper,
  DollarWrapper,
  StyledListItem,
  StyledIssueHeader,
  IssueLanguage,
  IssueOverview,
  StyledIssueContent,
  StyledIssueText,
  StyledIssueFooter,
  OrganizationNameWrapper,
  UpvotePanel,
} from './styledComponents';

const IssueCard = ({
  alerts: { error, success },
  clearAlerts,
  data,
  // handleDelete,
  // handleNav,
}) => {
  const hasCompanies = data.length > 0;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const IssueCardComponent = (
    <div>
      <BannerWrapper>
        <AdminSubHeader />
        <ErrorSuccessBanner
          error={error}
          onClose={clearAlerts}
          success={success}
        />
      </BannerWrapper>
      <StyledIssueCard>
        {data.map(
          ({
            id,
            name,
            organizationName,
            organizationVerified,
            language,
            body,
            attempts,
            rep,
            watch_list,
            comments,
            value,
          }) => (
            <div key={id}>
              <StyledListItem>
                <UpvotePanel>
                  <Upvote />
                  {rep}
                </UpvotePanel>
                <StyledIssueContent>
                  <StyledIssueHeader>
                    <OrganizationNameWrapper>
                      {organizationName}

                      {organizationVerified ? (
                        <IconToolTip toolTipText="Verified Contributor">
                          <div>
                            <Verified />
                          </div>
                        </IconToolTip>
                      ) : (
                        ''
                      )}
                    </OrganizationNameWrapper>

                    <IssueLanguage>{language}</IssueLanguage>
                    <SettingsMenu
                      anchorEl={anchorEl}
                      handleClick={handleClick}
                      handleClose={handleClose}
                    />
                  </StyledIssueHeader>
                  <StyledIssueText>
                    <NameWrapper>
                      <a href={`./issues/${id}`}>{name}</a>
                    </NameWrapper>
                    <IssueOverview>{body}</IssueOverview>
                  </StyledIssueText>
                  <StyledIssueFooter>
                    <div>
                      {' '}
                      <CommentIcon /> {comments.length} comments
                    </div>
                    <div>{false ? 'Resolved' : `${attempts} attempting`}</div>
                    <div>{watch_list.length} Watch</div>
                    <DollarWrapper>${value}</DollarWrapper>
                  </StyledIssueFooter>
                </StyledIssueContent>
              </StyledListItem>
            </div>
          ),
        )}
      </StyledIssueCard>
    </div>
  );
  return (
    <ConditionalRender
      Component={IssueCardComponent}
      FallbackComponent={<div>Hello</div>}
      shouldRender={hasCompanies}
    />
  );
};

IssueCard.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  // handleDelete: T.func,
  // handleNav: T.func,
};

export default IssueCard;
