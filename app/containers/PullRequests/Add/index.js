import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  clearError,
  createPullRequest,
  handleStep,
  importPullRequest,
  inputChange,
  inputError,
  resetState,
} from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import { makeSelectPullRequests } from '../selectors';
import { importPullRequestDictionary } from '../stepDictionary';

const AddPullRequest = ({
  alerts,
  dispatchCreatePullRequest,
  dispatchHandleStep,
  dispatchImportPullRequest,
  dispatchResetState,
  error,
  handleClearError,
  handleClose,
  handleInputChange,
  importData,
  issueId,
  loading,
  step,
}) => {
  useEffect(() => dispatchResetState, []);

  const ComponentToRender = importPullRequestDictionary[step];

  const handleImport = () => {
    const { importUrl } = importData;
    dispatchImportPullRequest({
      url: importUrl.value,
      issueId,
    });
  };
  const handleSubmit = () => {
    dispatchCreatePullRequest({ issueId, importData });
  };

  const propsToPassDown = {
    alerts,
    dispatchHandleStep,
    error,
    handleClearError,
    handleClose,
    handleImport,
    handleInputChange,
    handleSubmit,
    importData,
    loading,
  };

  return <ComponentToRender {...propsToPassDown} />;
};

AddPullRequest.propTypes = {
  alerts: T.object,
  dispatchCreatePullRequest: T.func,
  dispatchHandleStep: T.func,
  dispatchImportPullRequest: T.func,
  dispatchResetState: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]),
  handleClearError: T.func,
  handleClose: T.func,
  handleInputChange: T.func,
  importData: T.object,
  issueId: T.string,
  loading: T.bool,
  step: T.number,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : PullRequests
   */
  alerts: makeSelectPullRequests('alerts'),
  error: makeSelectPullRequests('error'),
  importData: makeSelectPullRequests('importData'),
  loading: makeSelectPullRequests('loading'),
  step: makeSelectPullRequests('step'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : PullRequests
     */
    dispatchCreatePullRequest: payload => dispatch(createPullRequest(payload)),
    dispatchHandleStep: payload => dispatch(handleStep(payload)),
    dispatchImportPullRequest: payload => dispatch(importPullRequest(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchResetState: () => dispatch(resetState()),
    handleClearError: () => dispatch(clearError()),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pullRequests', reducer });
const withSaga = injectSaga({ key: 'pullRequests', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddPullRequest);
