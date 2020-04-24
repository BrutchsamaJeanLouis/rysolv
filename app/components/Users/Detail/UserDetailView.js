import React, { Fragment } from 'react';
import T from 'prop-types';

import { Star } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';
import { formatUrlLinks } from 'utils/globalHelpers';

import UserMetricsView from './Metrics';
import UserTimelineView from './Timeline';
import {
  DetailViewContainer,
  OneLinkWrapper,
  LinkIcon,
  LinksWrapper,
  Name,
  Rep,
  StyledA,
  UserCardWrapper,
  UserContentsWrapper,
  UserImage,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

export class UserDetailView extends React.PureComponent {
  render() {
    const {
      data: {
        createdDate,
        firstName,
        githubLink,
        lastName,
        personalLink,
        preferredLanguages,
        profilePic,
        rep,
        stackoverflowLink,
      },
      filterValues,
      handleInputChange,
      handleNav,
    } = this.props;
    return (
      <Fragment>
        <DetailViewContainer>
          <UserCardWrapper>
            <UserImage src={profilePic} />
            <Name>
              {firstName} {lastName}
            </Name>
            <LinksWrapper>
              {githubLink && (
                <OneLinkWrapper>
                  <LinkIcon>{GithubIcon}</LinkIcon>
                  <StyledA href={githubLink} target="_blank">
                    {formatUrlLinks({ githubLink })}
                  </StyledA>
                </OneLinkWrapper>
              )}
              {personalLink && (
                <OneLinkWrapper>
                  <LinkIcon>{PersonalIcon}</LinkIcon>
                  <StyledA href={personalLink} target="_blank">
                    {formatUrlLinks({ personalLink })}
                  </StyledA>
                </OneLinkWrapper>
              )}
              {stackoverflowLink && (
                <OneLinkWrapper>
                  <LinkIcon>{StackoverflowIcon}</LinkIcon>
                  <StyledA href={stackoverflowLink} target="_blank">
                    {formatUrlLinks({ stackoverflowLink })}
                  </StyledA>
                </OneLinkWrapper>
              )}
            </LinksWrapper>
            <Rep>
              <Star />
              &nbsp;<b> {rep}</b>&nbsp;credits
            </Rep>
          </UserCardWrapper>
          <UserContentsWrapper>
            <UserMetricsView
              createdDate={createdDate}
              preferredLanguages={preferredLanguages}
            />
            <UserTimelineView
              filterValues={filterValues}
              handleInputChange={handleInputChange}
              handleNav={handleNav}
            />
          </UserContentsWrapper>
        </DetailViewContainer>
      </Fragment>
    );
  }
}

UserDetailView.propTypes = {
  data: T.object.isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserDetailView;
