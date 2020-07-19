import React, { useState } from 'react';
import T from 'prop-types';

import {
  BaseFileInput,
  ConditionalRender,
  IconButton,
  Star,
} from 'components/base_ui';
import { getBase64 } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyGithubLinkComponent,
  GithubEditComponent,
  GithubLinkComponent,
} from './GithubLinkComponents';
import {
  EmptyPersonalLinkComponent,
  PersonalEditComponent,
  PersonalLinkComponent,
} from './PersonalLinkComponents';
import {
  EmptyStackoverflowLinkComponent,
  StackoverflowEditComponent,
  StackoverflowLinkComponent,
} from './StackoverflowLinkComponents';
import UserMetricsView from './Metrics';
import SettingsTabs from './SettingsTabs';
import {
  DetailContainer,
  DetailViewContainer,
  EditUserImageWrapper,
  InputIconGroup,
  LinksWrapper,
  Name,
  Rep,
  SettingsTabsWrapper,
  StyledErrorSuccessBanner,
  UserCardWrapper,
  UserImage,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');

const SettingsView = ({
  alerts: { error, success },
  creditCardProps,
  currentTab,
  data: {
    activity,
    activePullRequests,
    attempting,
    balance,
    completedPullRequests,
    createdDate,
    dollarsEarned,
    email,
    firstName,
    githubLink,
    id,
    isOnline,
    issues,
    lastName,
    modifiedDate,
    organizations,
    personalLink,
    preferredLanguages,
    profilePic,
    rejectedPullRequests,
    rep,
    stackoverflowLink,
    username,
    watching,
  },
  deviceView,
  dispatchInputError,
  dispatchOpenModal,
  dispatchSaveChange,
  filterValues,
  handleClearAlerts,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  handleWithdrawFunds,
  inputErrors,
  PullRequestComponent,
  view,
}) => {
  const [displayBottom, setDisplayBottom] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeFirstName, setChangeFirstName] = useState(false);
  const [changeGithub, setChangeGithub] = useState(false);
  const [changeLastName, setChangeLastName] = useState(false);
  const [changePersonal, setChangePersonal] = useState(false);
  const [changePreferredLanguages, setChangePreferredLanguages] = useState(
    false,
  );
  const [changeStackoverflow, setChangeStackoverflow] = useState(false);
  const [changeUserImage, setChangeUserImage] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState('');

  const handleClose = ({ changeInputState }) => {
    changeInputState(false);
    setIsDisabled(false);
    setValue('');
  };

  const handleDone = ({ changeInputState, field }) => {
    changeInputState(false);
    dispatchSaveChange({ field, itemId: id, value });
    setIsDisabled(false);
  };

  const handleEdit = ({ changeInputState, currentValue = '' }) => {
    setIsDisabled(true);
    changeInputState(true);
    setValue(currentValue);
  };

  const handleUploadUserImage = async e => {
    const { files } = e.target;
    const formattedUserImage = await getBase64(files[0]);
    setIsDisabled(true);
    setChangeUserImage(true);
    setValue(formattedUserImage);
  };

  const profilePicToRender = !changeUserImage ? profilePic : value;
  return (
    <DetailContainer>
      <StyledErrorSuccessBanner
        error={error}
        onClose={handleClearAlerts}
        success={success}
      />
      <DetailViewContainer>
        <UserCardWrapper displayBottom={displayBottom}>
          <EditUserImageWrapper>
            <UserImage src={profilePicToRender} />
            <ConditionalRender
              Component={
                <BaseFileInput
                  accept="image/png, image/jpeg"
                  id="logo-file-input"
                  onChange={handleUploadUserImage}
                />
              }
              FallbackComponent={
                <InputIconGroup>
                  <IconButton
                    icon={CloseIcon}
                    label="Close"
                    onClick={() =>
                      handleClose({ changeInputState: setChangeUserImage })
                    }
                  />
                  <IconButton
                    icon={DoneIcon}
                    label="Save"
                    onClick={() =>
                      handleDone({
                        changeInputState: setChangeUserImage,
                        field: 'profilePic',
                      })
                    }
                  />
                </InputIconGroup>
              }
              shouldRender={!changeUserImage}
            />
          </EditUserImageWrapper>
          <Name>
            {firstName} {lastName}
          </Name>
          <LinksWrapper>
            <ConditionalRender
              Component={
                <ConditionalRender
                  Component={GithubLinkComponent}
                  FallbackComponent={EmptyGithubLinkComponent}
                  propsToPassDown={{
                    githubLink,
                    handleEdit,
                    isDisabled,
                    setChangeGithub,
                  }}
                  shouldRender={!!githubLink}
                />
              }
              FallbackComponent={
                <GithubEditComponent
                  handleClose={handleClose}
                  handleDone={handleDone}
                  setChangeGithub={setChangeGithub}
                  setValue={setValue}
                  value={value}
                />
              }
              shouldRender={!changeGithub}
            />
            <ConditionalRender
              Component={
                <ConditionalRender
                  Component={PersonalLinkComponent}
                  FallbackComponent={EmptyPersonalLinkComponent}
                  propsToPassDown={{
                    handleEdit,
                    isDisabled,
                    personalLink,
                    setChangePersonal,
                  }}
                  shouldRender={!!personalLink}
                />
              }
              FallbackComponent={
                <PersonalEditComponent
                  handleClose={handleClose}
                  handleDone={handleDone}
                  setChangePersonal={setChangePersonal}
                  setValue={setValue}
                  value={value}
                />
              }
              shouldRender={!changePersonal}
            />
            <ConditionalRender
              Component={
                <ConditionalRender
                  Component={StackoverflowLinkComponent}
                  FallbackComponent={EmptyStackoverflowLinkComponent}
                  propsToPassDown={{
                    stackoverflowLink,
                    handleEdit,
                    isDisabled,
                    setChangeStackoverflow,
                  }}
                  shouldRender={!!stackoverflowLink}
                />
              }
              FallbackComponent={
                <StackoverflowEditComponent
                  handleClose={handleClose}
                  handleDone={handleDone}
                  setChangeStackoverflow={setChangeStackoverflow}
                  setValue={setValue}
                  value={value}
                />
              }
              shouldRender={!changeStackoverflow}
            />
          </LinksWrapper>
          <Rep>
            <Star />
            &nbsp;<b> {rep}</b>&nbsp;credits
          </Rep>
          <UserMetricsView
            activePullRequests={activePullRequests}
            changePreferredLanguages={changePreferredLanguages}
            completedPullRequests={completedPullRequests}
            createdDate={createdDate}
            dollarsEarned={dollarsEarned}
            handleClose={handleClose}
            handleDone={handleDone}
            handleEdit={handleEdit}
            isDisabled={isDisabled}
            isOnline={isOnline}
            modifiedDate={modifiedDate}
            preferredLanguages={preferredLanguages}
            rejectedPullRequests={rejectedPullRequests}
            setChangePreferredLanguages={setChangePreferredLanguages}
            setValue={setValue}
            value={value}
          />
        </UserCardWrapper>
        <SettingsTabsWrapper displayBottom={displayBottom}>
          <SettingsTabs
            activity={activity}
            attempting={attempting}
            balance={balance}
            changeEmail={changeEmail}
            changeFirstName={changeFirstName}
            changeLastName={changeLastName}
            changeUsername={changeUsername}
            creditCardProps={creditCardProps}
            currentTab={currentTab}
            deviceView={deviceView}
            dispatchInputError={dispatchInputError}
            dispatchOpenModal={dispatchOpenModal}
            displayBottom={displayBottom}
            dollarsEarned={dollarsEarned}
            email={email}
            filterValues={filterValues}
            firstName={firstName}
            handleClose={handleClose}
            handleDone={handleDone}
            handleEdit={handleEdit}
            handleInputChange={handleInputChange}
            handleNav={handleNav}
            handleRemoveIssue={handleRemoveIssue}
            handleWithdrawFunds={handleWithdrawFunds}
            inputErrors={inputErrors}
            isDisabled={isDisabled}
            issues={issues}
            lastName={lastName}
            organizations={organizations}
            PullRequestComponent={PullRequestComponent}
            setChangeEmail={setChangeEmail}
            setChangeFirstName={setChangeFirstName}
            setChangeLastName={setChangeLastName}
            setChangeUsername={setChangeUsername}
            setDisplayBottom={setDisplayBottom}
            setValue={setValue}
            userId={id}
            username={username}
            value={value}
            view={view}
            watching={watching}
          />
        </SettingsTabsWrapper>
      </DetailViewContainer>
    </DetailContainer>
  );
};

SettingsView.propTypes = {
  alerts: T.object.isRequired,
  creditCardProps: T.object.isRequired,
  currentTab: T.number.isRequired,
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveChange: T.func.isRequired,
  filterValues: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveIssue: T.func.isRequired,
  handleWithdrawFunds: T.func.isRequired,
  inputErrors: T.object.isRequired,
  PullRequestComponent: T.oneOfType([T.func, T.node, T.object]),
  view: T.string,
};

export default SettingsView;
