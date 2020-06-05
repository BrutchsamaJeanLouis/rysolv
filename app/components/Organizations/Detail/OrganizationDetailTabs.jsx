import React from 'react';
import T from 'prop-types';
import Tabs from '@material-ui/core/Tabs';

import { ConditionalRender } from 'components/base_ui';

import OrganizationContributorsTab from './Contributors/OrganizationContributorsTab';
import OrganizationIssuesTab from './Issues/OrganizationIssuesTab';
import ContributorsSearchHeader from './Contributors/ContributorsSearchHeader';
import IssuesSearchHeader from './Issues/IssuesSearchHeader';
import {
  EmptyMessageComponent,
  StyledPaper,
  StyledTab,
} from './styledComponents';

const OrganizationDetailTabs = ({
  contributors,
  dispatchOpenModal,
  filterValues,
  handleInputChange,
  handleNav,
  handleUpvote,
  isSignedIn,
  issues,
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { issues: issuesFilter } = filterValues;

  const OrganizationContributorsTabComponent = (
    <ConditionalRender
      Component={
        <OrganizationContributorsTab
          contributors={contributors}
          handleNav={handleNav}
        />
      }
      FallbackComponent={
        <EmptyMessageComponent>
          No contributors match the search terms.
        </EmptyMessageComponent>
      }
      shouldRender={!!contributors.length}
    />
  );

  const OrganizationIssuesTabComponent = (
    <ConditionalRender
      Component={
        <OrganizationIssuesTab
          dispatchOpenModal={dispatchOpenModal}
          handleNav={handleNav}
          handleUpvote={handleUpvote}
          isSignedIn={isSignedIn}
          issues={issues}
        />
      }
      FallbackComponent={
        <EmptyMessageComponent>
          No issues match the search terms.
        </EmptyMessageComponent>
      }
      shouldRender={!!issues.length}
    />
  );

  return (
    <StyledPaper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <StyledTab label="Issues" />
        <StyledTab label="Contributors" />
      </Tabs>
      <ConditionalRender
        Component={
          <ContributorsSearchHeader handleInputChange={handleInputChange} />
        }
        FallbackComponent={
          <IssuesSearchHeader
            handleInputChange={handleInputChange}
            issuesFilter={issuesFilter}
          />
        }
        shouldRender={!!value}
      />
      <ConditionalRender
        Component={OrganizationContributorsTabComponent}
        FallbackComponent={OrganizationIssuesTabComponent}
        shouldRender={!!value}
      />
    </StyledPaper>
  );
};

OrganizationDetailTabs.propTypes = {
  contributors: T.array,
  dispatchOpenModal: T.func,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  issues: T.array,
};

export default OrganizationDetailTabs;
