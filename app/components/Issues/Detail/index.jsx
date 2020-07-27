import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BackNav, ConditionalRender } from 'components/base_ui';
import { CommentCard, NewComment, NoComment } from 'components/MarkdownRender';
import PaymentPortal from 'components/Payments';
import UpvotePanel from 'components/Upvote';
import iconDictionary from 'utils/iconDictionary';

import IssueDetailBody from './IssueDetailBody';
import IssueDetailHeader from './IssueDetailHeader';
import IssueTopBar from './IssueTopBar';
import {
  CommentWrapper,
  DetailContainer,
  Divider,
  EditIssueWrapper,
  IssueDetailColumn,
  IssueDetailContainer,
  IssueDetailContentContainer,
  IssueDetailWrapper,
  LeftPanel,
  ManageIssueWrapper,
  SidebarContainer,
  StyledButton,
  StyledErrorSuccessBanner,
  StyledIssueAccountManager,
  TopBarWrapper,
} from './styledComponents';

const CloseCircleIcon = iconDictionary('closeCircle');
const OpenCircleIcon = iconDictionary('successOutline');

const IssueDetail = ({
  activeUser,
  activeUser: { balance, email, firstName, id: activeUserId, issues, lastName },
  alerts: { error, success },
  data,
  data: {
    body,
    comments,
    createdDate,
    fundedAmount,
    id: issueId,
    language,
    name,
    open,
    organizationId,
    profilePic,
    rep,
    repo,
    userId,
    username,
  },
  deviceView,
  dispatchCloseIssue,
  dispatchEditIssue,
  dispatchFetchPullRequestList,
  dispatchFetchWatchList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  handleClearAlerts,
  handleComment,
  handleIncrement,
  handleNav,
  handleSubmitAccountPayment,
  handleUpvote,
  isSignedIn,
  paymentAlerts,
}) => {
  const [displayEditView, setDisplayEditView] = useState(false);
  const [bodyChange, setBodyChange] = useState(body);
  const [languageChange, setLanguageChange] = useState(language);
  const [nameChange, setNameChange] = useState(name);
  const handleClose = () => {
    setDisplayEditView(false);
    setBodyChange(body);
    setLanguageChange(language);
    setNameChange(name);
  };

  const handleSave = () => {
    dispatchEditIssue({
      editRequest: {
        body: bodyChange,
        name: nameChange,
        language: languageChange,
      },
      issueId,
    });
  };

  const CloseOpenIssueComponent = (
    <ConditionalRender
      Component={
        <StyledButton
          disableRipple
          onClick={() =>
            dispatchOpenModal({
              modalState: 'closeIssue',
              tableData: { issueId },
            })
          }
          open={open}
        >
          {CloseCircleIcon}
          Close Issue
        </StyledButton>
      }
      FallbackComponent={
        <StyledButton
          disableRipple
          onClick={() =>
            dispatchCloseIssue({
              issueId,
              shouldClose: false,
              userId: activeUserId,
            })
          }
          open={open}
        >
          {OpenCircleIcon}
          Reopen Issue
        </StyledButton>
      }
      shouldRender={open}
    />
  );

  const EditIssueComponent = (
    <StyledIssueAccountManager
      displayEditView={displayEditView}
      handleClose={handleClose}
      handleSave={handleSave}
      setDisplayEditView={setDisplayEditView}
      type="issue"
    />
  );

  const primaryUser = {
    alt: username,
    detailRoute: `/users/detail/${userId}`,
    profilePic,
    small: true,
    username,
  };

  const generateComments = () =>
    comments.map(comment => {
      const user = {
        alt: comment.username,
        detailRoute: `/users/detail/${comment.userId}`,
        profilePic: comment.profilePic,
        size: '4rem',
        username: comment.username,
      };
      return (
        <CommentCard
          key={`${comment.username}-${comment.createdDate}`}
          body={comment.body}
          date={comment.createdDate}
          handleNav={handleNav}
          userProfile={user}
        />
      );
    });

  const commentsDiv =
    comments && comments.length > 0 ? generateComments() : <NoComment />;

  const isDesktop =
    deviceView === 'desktopS' ||
    deviceView === 'desktop' ||
    deviceView === 'desktopL';

  const isMobileOrLaptop =
    deviceView === 'mobileXXS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobile' ||
    deviceView === 'tablet' ||
    deviceView === 'laptopS' ||
    deviceView === 'laptop';

  const upvoted = activeUser.upvotes && activeUser.upvotes.includes(issueId);

  const ManageIssueComponent = () => (
    <Fragment>
      <Divider>Manage Issue</Divider>
      <ManageIssueWrapper>
        <EditIssueWrapper>{EditIssueComponent}</EditIssueWrapper>
        {CloseOpenIssueComponent}
      </ManageIssueWrapper>
    </Fragment>
  );
  return (
    <IssueDetailContainer>
      <BackNav label="Back to Issues" handleNav={handleNav} path="/issues" />
      <ConditionalRender
        Component={
          <StyledErrorSuccessBanner
            error={error}
            onClose={handleClearAlerts}
            success={success}
          />
        }
        shouldRender={
          isSignedIn && issues && !!issues.find(({ id }) => issueId === id)
        }
      />
      <DetailContainer>
        <IssueDetailWrapper>
          <LeftPanel>
            <UpvotePanel
              dispatchOpenModal={dispatchOpenModal}
              handleUpvote={handleUpvote}
              isIssueDetail
              isSignedIn={isSignedIn}
              issueId={issueId}
              rep={rep}
              upvoted={upvoted}
              userId={activeUserId}
            />
          </LeftPanel>
          <IssueDetailContentContainer>
            <TopBarWrapper>
              <IssueTopBar
                activeUser={activeUser}
                data={data}
                dispatchFetchPullRequestList={dispatchFetchPullRequestList}
                dispatchFetchWatchList={dispatchFetchWatchList}
                dispatchOpenIssueModal={dispatchOpenIssueModal}
                dispatchOpenModal={dispatchOpenModal}
                handleIncrement={handleIncrement}
                isDesktop={isDesktop}
                isSignedIn={isSignedIn}
              />
            </TopBarWrapper>
            <IssueDetailColumn>
              <IssueDetailHeader
                data={data}
                displayEditView={displayEditView}
                handleNav={handleNav}
                isSignedIn={isSignedIn}
                nameChange={nameChange}
                setNameChange={setNameChange}
              />

              <div style={{ minHeight: '30rem' }}>
                <IssueDetailBody
                  body={body}
                  bodyChange={bodyChange}
                  date={createdDate}
                  displayEditView={displayEditView}
                  handleNav={handleNav}
                  language={language}
                  languageChange={languageChange}
                  repo={repo}
                  setBodyChange={setBodyChange}
                  setLanguageChange={setLanguageChange}
                  userProfile={primaryUser}
                />
              </div>

              <ConditionalRender
                Component={ManageIssueComponent}
                shouldRender={
                  isMobileOrLaptop &&
                  isSignedIn &&
                  issues &&
                  !!issues.find(({ id }) => issueId === id)
                }
              />

              <Divider>Comments</Divider>
              <CommentWrapper>{commentsDiv}</CommentWrapper>

              <ConditionalRender
                Component={
                  <Fragment>
                    <Divider>Leave a Comment</Divider>
                    <CommentWrapper>
                      <NewComment
                        activeUser={activeUser}
                        handleComment={handleComment}
                        handleNav={handleNav}
                        issueId={issueId}
                      />
                    </CommentWrapper>
                  </Fragment>
                }
                shouldRender={isSignedIn}
              />
            </IssueDetailColumn>
          </IssueDetailContentContainer>
        </IssueDetailWrapper>
        <SidebarContainer>
          <ConditionalRender
            Component={EditIssueComponent}
            shouldRender={
              isSignedIn && issues && !!issues.find(({ id }) => issueId === id)
            }
          />
          <PaymentPortal
            balance={balance}
            email={email}
            firstName={firstName}
            fundedAmount={fundedAmount}
            handleClearAlerts={handleClearAlerts}
            handleNav={handleNav}
            handleSubmitAccountPayment={handleSubmitAccountPayment}
            isSignedIn={isSignedIn}
            issueId={issueId}
            lastName={lastName}
            open={open}
            organizationId={organizationId}
            paymentAlerts={paymentAlerts}
            userId={activeUserId}
          />
          <ConditionalRender
            Component={CloseOpenIssueComponent}
            shouldRender={
              isSignedIn && issues && !!issues.find(({ id }) => issueId === id)
            }
          />
        </SidebarContainer>
      </DetailContainer>
    </IssueDetailContainer>
  );
};

IssueDetail.propTypes = {
  activeUser: T.object,
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  data: T.object,
  deviceView: T.string,
  dispatchCloseIssue: T.func,
  dispatchEditIssue: T.func,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleClearAlerts: T.func,
  handleComment: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  paymentAlerts: T.object,
};

export default IssueDetail;
