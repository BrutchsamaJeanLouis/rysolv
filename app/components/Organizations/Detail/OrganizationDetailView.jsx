import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender, Verified } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import OrganizationDetailTabs from './OrganizationDetailTabs';
import TopLanguagesView from './TopLanguagesView';
import RecentActivityView from './RecentActivityView';
import {
  ContentWrapper,
  Description,
  DetailViewContainer,
  Divider,
  Image,
  MainTabs,
  Name,
  NameWrapper,
  OrganizationUrl,
  RepoUrl,
  SidebarTabs,
  StyledIcon,
  TabsContainer,
  UrlWrapper,
  VerifiedWrapper,
} from './styledComponents';

const LinkIcon = iconDictionary('link');

const VerifiedComponent = (
  <VerifiedWrapper>
    <Verified />
    Verified
  </VerifiedWrapper>
);

const fundData = [
  {
    fundAmount: '10',
    fundDate: '10/12/2018',
    issueName: 'react-native-community/react-native-camera# 2786',
    user: 'ceefour',
    userImage: 'https://rysolv.s3.us-east-2.amazonaws.com/tylerprofile.png',
  },
  {
    fundAmount: '2',
    fundDate: '03/15/2017',
    issueName: 'react-native-community/react-native-camera# 959',
    user: 'sibelius',
    userImage: 'https://rysolv.s3.us-east-2.amazonaws.com/paulprofile.png',
  },
];

export class OrganizationDetailView extends React.PureComponent {
  render() {
    const {
      data: {
        organizationUrl,
        contributors,
        description,
        issues,
        languages,
        logo,
        name,
        repoUrl,
        verified,
      },
      filterValues,
      handleInputChange,
      handleNav,
      handleUpvote,
    } = this.props;
    return (
      <Fragment>
        <DetailViewContainer>
          <Image src={logo} />
          <ContentWrapper>
            <NameWrapper>
              <Name>{name}</Name>
              <ConditionalRender
                Component={VerifiedComponent}
                shouldRender={verified}
              />
            </NameWrapper>
            <Description>{description}</Description>
            <UrlWrapper>
              <OrganizationUrl href={organizationUrl} target="_blank">
                <StyledIcon>{LinkIcon}</StyledIcon>
                {organizationUrl}
              </OrganizationUrl>
              <RepoUrl href={repoUrl} target="_blank">
                <StyledIcon>{LinkIcon}</StyledIcon>
                {repoUrl}
              </RepoUrl>
            </UrlWrapper>
          </ContentWrapper>
        </DetailViewContainer>
        <TabsContainer>
          <MainTabs>
            <OrganizationDetailTabs
              contributors={contributors}
              filterValues={filterValues}
              handleInputChange={handleInputChange}
              handleNav={handleNav}
              handleUpvote={handleUpvote}
              issues={issues}
            />
          </MainTabs>
          <SidebarTabs>
            <TopLanguagesView languages={languages} />
            <Divider />
            <RecentActivityView fundData={fundData} handleNav={handleNav} />
          </SidebarTabs>
        </TabsContainer>
      </Fragment>
    );
  }
}

OrganizationDetailView.propTypes = {
  data: T.object,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
};

export default OrganizationDetailView;
