import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import ImportForm from 'components/Issues/Add/ImportForm';

import { validateIssueUrl } from 'utils/validate';
import {
  importIssue,
  incrementStep,
  inputChange,
  inputError,
} from '../actions';
import {
  makeSelectIssueDetailError,
  makeSelectIssues,
  makeSelectIssuesLoading,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportIssue extends React.PureComponent {
  render() {
    const {
      dispatchImportIssue,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
      importError,
      importIssueLoading,
      issueData,
    } = this.props;
    const handleSubmit = () => {
      const {
        importUrl: { value: url },
      } = issueData;
      const { error, validatedUrl, message } = validateIssueUrl(url);

      if (error) {
        dispatchInputError({ errors: { importUrl: message } });
      } else {
        dispatchImportIssue({ validatedUrl });
      }
    };

    return (
      <Fragment>
        <AsyncRender
          component={ImportForm}
          isRequiredData={false}
          loading={importIssueLoading}
          propsToPassDown={{
            handleIncrementStep,
            handleInputChange,
            handleSubmit,
            importError,
            importIssueLoading,
            issueData,
          }}
        />
      </Fragment>
    );
  }
}

ImportIssue.propTypes = {
  dispatchImportIssue: T.func,
  dispatchInputError: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  importError: T.object,
  importIssueLoading: T.bool,
  issueData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  importError: makeSelectIssueDetailError('importIssue'),
  importIssueLoading: makeSelectIssuesLoading('importIssue'),
  issueData: makeSelectIssues('issueData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchImportIssue: payload => dispatch(importIssue(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportIssue);
