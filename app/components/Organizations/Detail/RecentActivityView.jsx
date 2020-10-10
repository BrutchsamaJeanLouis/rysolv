/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import moment from 'moment';
import T from 'prop-types';

import { ConditionalRender, ImageLinkWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import { anonymousUserImage } from './constants';
import {
  ActivityContainer,
  ActivityDate,
  ActivityWrapper,
  EmptyMessageComponent,
  FundContent,
  ProfileImageWrapper,
  RecentActivityContainer,
  StyledAction,
  StyledTitled,
  StyledExternalLink,
  StyledWordLink,
} from './styledComponents';

export class RecentActivityView extends React.PureComponent {
  render() {
    const { activity } = this.props;
    const ActivityComponent = (
      <ActivityContainer>
        {activity.map(
          ({
            action,
            activityId,
            date,
            fundedValue,
            path,
            target: { targetName, targetType },
            user: { userId, username, profilePic },
          }) => {
            const disabled = !userId;
            return (
              <ActivityWrapper key={activityId}>
                <div style={{ display: 'flex' }}>
                  <ProfileImageWrapper>
                    <ImageLinkWrapper
                      alt={username || 'anonymous'}
                      disabled={disabled}
                      image={profilePic || anonymousUserImage}
                      route={`/users/detail/${userId}`}
                    />
                  </ProfileImageWrapper>
                  <FundContent>
                    <StyledWordLink
                      disabled={disabled}
                      to={`/users/detail/${userId}`}
                    >
                      {username || 'anonymous'}
                    </StyledWordLink>
                    &nbsp;
                    <StyledAction>
                      {action} {targetType.toLowerCase()}
                    </StyledAction>
                    &nbsp;
                    {fundedValue
                      ? `for ${formatDollarAmount(fundedValue)} `
                      : ''}
                    <StyledExternalLink to={path}>
                      {targetName}
                    </StyledExternalLink>
                    <ActivityDate>{moment(date).fromNow()}</ActivityDate>
                  </FundContent>
                </div>
              </ActivityWrapper>
            );
          },
        )}
      </ActivityContainer>
    );

    return (
      <Fragment>
        <RecentActivityContainer>
          <StyledTitled>Recent activities</StyledTitled>
          <ConditionalRender
            Component={ActivityComponent}
            FallbackComponent={
              <EmptyMessageComponent>No recent activity.</EmptyMessageComponent>
            }
            shouldRender={activity.length > 0}
          />
        </RecentActivityContainer>
      </Fragment>
    );
  }
}

RecentActivityView.propTypes = { activity: T.array };

export default RecentActivityView;
