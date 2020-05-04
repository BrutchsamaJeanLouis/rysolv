import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyForm from 'components/Organizations/Add/VerifyForm';

import { incrementStep, saveInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsRequestBody,
} from '../selectors';
import {
  ButtonGroup,
  StyledCheckboxWithLabel,
  StyledH3,
  Wrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyOrganization extends React.PureComponent {
  render() {
    const {
      data,
      dispatchIncrementStep,
      dispatchSaveInfo,
      dispatchVerifyInfo,
      handleNav,
      isVerified,
      requestBody,
    } = this.props;
    const handleSaveInfo = () => {
      dispatchSaveInfo({ requestBody });
      handleNav('/organizations');
    };
    return (
      <Fragment>
        <StyledH3>Verify Organization Information</StyledH3>
        <Wrapper>
          <VerifyForm data={data} />
          <StyledCheckboxWithLabel
            checked={isVerified}
            label={verifyMessage}
            onChange={dispatchVerifyInfo}
          />
        </Wrapper>
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() =>
              dispatchIncrementStep({ step: 2, view: 'addOrganization' })
            }
          />
          <PrimaryAsyncButton
            disabled={!isVerified}
            label="Save"
            onClick={handleSaveInfo}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

VerifyOrganization.propTypes = {
  data: T.object,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
  isVerified: T.bool,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  data: makeSelectOrganizations('data'),
  isVerified: makeSelectOrganizations('isVerified'),
  requestBody: makeSelectOrganizationsRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchSaveInfo: payload => dispatch(saveInfo(payload)),
    dispatchVerifyInfo: () => dispatch(verifyInfo()),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyOrganization);
