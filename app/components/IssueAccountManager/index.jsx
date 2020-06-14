import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import {
  ButtonWrapper,
  StyledPrimaryButton,
  StyledSecondayButton,
} from './styledComponents';

const IssueAccountManager = ({
  displayEditView,
  handleSave,
  setDisplayEditView,
  ...restProps
}) => {
  const EditView = (
    <StyledPrimaryButton
      label="Edit"
      onClick={() => setDisplayEditView(true)}
    />
  );

  const SaveView = (
    <div>
      <StyledSecondayButton
        label="Cancel"
        onClick={() => setDisplayEditView(false)}
      />
      <StyledPrimaryButton label="Save" onClick={() => handleSave()} />
    </div>
  );
  return (
    <ButtonWrapper {...restProps}>
      <ConditionalRender
        Component={EditView}
        FallbackComponent={SaveView}
        shouldRender={!displayEditView}
      />
    </ButtonWrapper>
  );
};

IssueAccountManager.propTypes = {
  displayEditView: T.bool,
  handleSave: T.func,
  setDisplayEditView: T.func,
};

export default IssueAccountManager;
