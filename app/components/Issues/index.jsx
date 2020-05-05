import React, { Fragment } from 'react';
import T from 'prop-types';

import AdminSubHeader from 'components/Admin/AdminSubHeader';
import { ErrorSuccessBanner } from 'components/base_ui';
import Filter from 'components/Filter';
import autocompleteDictionary from 'utils/autocompleteDictionary';

import EmptyCard from './EmptyCard';
import IssueCard from './Card';
import { BannerWrapper, FilterContainer } from './styledComponents';

const Issues = ({
  activeUser,
  alerts: { error, success },
  clearAlerts,
  data,
  disabled,
  handleDeleteIssue,
  handleIncrement,
  handleInputChange,
  handleNav,
  handleSearchIssues,
  handleUpvote,
  search,
}) => {
  const hasData = data.length > 0 && !data.includes(null);
  const propsToPassDown = {
    activeUser,
    data,
    handleDeleteIssue,
    handleIncrement,
    handleNav,
    handleUpvote,
  };
  const route = '/issues/add';
  const viewToRender = hasData ? (
    <IssueCard {...propsToPassDown} />
  ) : (
    <EmptyCard />
  );
  return (
    <Fragment>
      <FilterContainer>
        <Filter languageOptions={autocompleteDictionary.language} />
      </FilterContainer>
      <div>
        <BannerWrapper>
          <AdminSubHeader
            disabled={disabled}
            handleInputChange={handleInputChange}
            handleNav={handleNav}
            handleSearch={handleSearchIssues}
            route={route}
            search={search}
          />
          <ErrorSuccessBanner
            error={error}
            onClose={clearAlerts}
            success={success}
          />
        </BannerWrapper>
        {viewToRender}
      </div>
    </Fragment>
  );
};

Issues.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  clearAlerts: T.func,
  data: T.array,
  disabled: T.bool.isRequired,
  handleIncrement: T.func,
  handleDeleteIssue: T.func,
  handleUpvote: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchIssues: T.func,
  search: T.object,
};

export default Issues;
