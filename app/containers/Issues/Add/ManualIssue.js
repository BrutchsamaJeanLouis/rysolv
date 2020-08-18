import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Issues/Add/ManualForm';

import { incrementStep, inputChange, updateIsManual } from '../actions';
import { makeSelectIssues, makeSelectIssuesDisabled } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  SelectedOrganization,
  StyledFocusDiv,
  StyledH3,
  StyledLink,
  VerifyWrapper,
} from './styledComponents';

const ManualIssue = ({
  dispatchUpdateIsManual,
  handleIncrementStep,
  handleInputChange,
  isDisabled,
  issueData,
  organizationData,
}) => {
  useEffect(() => {
    dispatchUpdateIsManual({ value: true });
    document.getElementById('issue-manual').focus();
  }, []);

  const handleKeypress = ({ keyCode, which }) => {
    if ((keyCode === 13 || which === 13 || 0) && isDisabled) {
      handleIncrementStep({ step: 4, view: 'addIssue' });
    }
  };
  return (
    <StyledFocusDiv
      id="issue-manual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Organization</StyledH3>
      <VerifyWrapper>
        <SelectedOrganization>
          {organizationData.organizationName.value}
        </SelectedOrganization>
        <StyledLink
          href={`//${organizationData.organizationRepo.value}`}
          target="_blank"
        >
          {organizationData.organizationRepo.value}
        </StyledLink>
      </VerifyWrapper>
      <StyledH3>Add Issue</StyledH3>
      <ManualForm handleInputChange={handleInputChange} issueData={issueData} />
      <ButtonGroup>
        <BackLink
          onClick={() => handleIncrementStep({ step: 2, view: 'addIssue' })}
        >
          Edit Org
        </BackLink>
        <PrimaryButton
          disabled={!isDisabled}
          label="Preview Issue"
          onClick={() => handleIncrementStep({ step: 4, view: 'addIssue' })}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ManualIssue.propTypes = {
  dispatchUpdateIsManual: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  issueData: T.object,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  isDisabled: makeSelectIssuesDisabled(),
  issueData: makeSelectIssues('issueData'),
  organizationData: makeSelectIssues('organizationData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualIssue);
