import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import UserAccount from './Account';
import UserAttempting from './Attempting';
import DepositFormComponent from './Balance/Deposit/DepositFormComponent';
import WithdrawalFormComponent from './Balance/Withdrawal/WithdrawalFormComponent';
import UserIssues from './Issues';
import UserOrganizations from './Organizations';
import UserTimelineView from './Timeline';
import UserWatching from './Watching';
import { StyledPaper, StyledTab, StyledTabs } from './styledComponents';

const SettingsTabs = ({
  activity,
  attempting,
  balance,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeUsername,
  creditCardProps,
  currentTab,
  dispatchOpenModal,
  displayBottom,
  dollarsEarned,
  email,
  filterValues,
  firstName,
  handleClose,
  handleDone,
  handleEdit,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  isDisabled,
  issues,
  lastName,
  organizations,
  setChangeEmail,
  setChangeFirstName,
  setChangeLastName,
  setChangeUsername,
  setDisplayBottom,
  setValue,
  userId,
  username,
  value,
  view,
  watching,
}) => {
  const [tab, setTab] = useState(currentTab);
  useEffect(() => setValue(currentTab), [currentTab]);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const BalanceFormComponent = (
    <ConditionalRender
      Component={
        <DepositFormComponent
          creditCardProps={creditCardProps}
          handleNav={handleNav}
          setDisplayBottom={setDisplayBottom}
        />
      }
      FallbackComponent={
        <WithdrawalFormComponent
          balance={balance}
          handleNav={handleNav}
          setDisplayBottom={setDisplayBottom}
        />
      }
      shouldRender={view === 'deposit'}
    />
  );

  const ListComponent = (
    <ConditionalRender
      Component={
        <UserAttempting
          attempting={attempting}
          handleNav={handleNav}
          handleRemoveIssue={handleRemoveIssue}
          userId={userId}
        />
      }
      FallbackComponent={
        <UserWatching
          handleNav={handleNav}
          handleRemoveIssue={handleRemoveIssue}
          userId={userId}
          watching={watching}
        />
      }
      shouldRender={view === 'attempting'}
    />
  );

  const SecondarySettingsComponent = (
    <ConditionalRender
      Component={ListComponent}
      FallbackComponent={BalanceFormComponent}
      shouldRender={view === 'attempting' || view === 'watching'}
    />
  );
  const ComponentToRender = {
    0: (
      <UserTimelineView
        activity={activity}
        attempting={attempting}
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        handleNav={handleNav}
        handleRemoveIssue={handleRemoveIssue}
        userId={userId}
        watching={watching}
      />
    ),
    1: (
      <UserAccount
        balance={balance}
        changeEmail={changeEmail}
        changeFirstName={changeFirstName}
        changeLastName={changeLastName}
        changeUsername={changeUsername}
        dispatchOpenModal={dispatchOpenModal}
        dollarsEarned={dollarsEarned}
        email={email}
        firstName={firstName}
        handleClose={handleClose}
        handleDone={handleDone}
        handleEdit={handleEdit}
        handleNav={handleNav}
        isDisabled={isDisabled}
        lastName={lastName}
        setChangeEmail={setChangeEmail}
        setChangeFirstName={setChangeFirstName}
        setChangeLastName={setChangeLastName}
        setChangeUsername={setChangeUsername}
        setDisplayBottom={setDisplayBottom}
        setValue={setValue}
        username={username}
        value={value}
      />
    ),
    2: <UserIssues handleNav={handleNav} issues={issues} />,
    3: (
      <UserOrganizations handleNav={handleNav} organizations={organizations} />
    ),
  };
  return (
    <StyledPaper>
      <StyledTabs
        centered
        displayBottom={displayBottom}
        indicatorColor="primary"
        onChange={handleChangeTab}
        textColor="primary"
        value={tab}
      >
        <StyledTab
          label="Overview"
          onClick={() => handleNav('/settings/overview')}
        />
        <StyledTab
          label="Account"
          onClick={() => handleNav('/settings/account')}
        />
        <StyledTab
          label="Issues"
          onClick={() => handleNav('/settings/issues')}
        />
        <StyledTab
          label="Organizations"
          onClick={() => handleNav('/settings/organizations')}
        />
        <StyledTab
          label="Pull Requests"
          onClick={() => handleNav('/settings/pullrequests')}
        />
      </StyledTabs>
      <ConditionalRender
        Component={SecondarySettingsComponent}
        FallbackComponent={ComponentToRender[tab]}
        shouldRender={
          view === 'attempting' ||
          view === 'deposit' ||
          view === 'watching' ||
          view === 'withdrawal'
        }
      />
    </StyledPaper>
  );
};

SettingsTabs.propTypes = {
  activity: T.array,
  attempting: T.array,
  balance: T.number,
  changeEmail: T.bool,
  changeFirstName: T.bool,
  changeLastName: T.bool,
  changeUsername: T.bool,
  creditCardProps: T.object,
  currentTab: T.number,
  dispatchOpenModal: T.func,
  displayBottom: T.bool,
  dollarsEarned: T.number,
  email: T.string,
  filterValues: T.object,
  firstName: T.string,
  handleClose: T.func,
  handleDone: T.func,
  handleEdit: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleRemoveIssue: T.func,
  isDisabled: T.bool,
  issues: T.array,
  lastName: T.string,
  organizations: T.array,
  setChangeEmail: T.func,
  setChangeFirstName: T.func,
  setChangeLastName: T.func,
  setChangeUsername: T.func,
  setDisplayBottom: T.func,
  setValue: T.func,
  userId: T.string,
  username: T.string,
  value: T.oneOfType([T.array, T.number, T.string]),
  view: T.string,
  watching: T.array,
};

export default SettingsTabs;
