import React from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  ContentGroup,
  DescriptionWrapper,
  QuestionWrapper,
  StyledButton,
  ViewContainer,
} from './styledComponents';

const ContractConfirmationModal = ({ contract, handleClose }) => {
  const { title } = contract;

  return (
    <ViewContainer>
      <QuestionWrapper>Your account has been upgraded!</QuestionWrapper>
      <ContentGroup>
        <DescriptionWrapper>
          You are now on the {title} plan.
        </DescriptionWrapper>
        <DescriptionWrapper>
          You now have access to all {title} features. This upgrade will be
          reflected on your next billing cycle.
        </DescriptionWrapper>
      </ContentGroup>
      <ButtonGroup>
        <StyledButton disableRipple onClick={() => handleClose()}>
          Close
        </StyledButton>
      </ButtonGroup>
    </ViewContainer>
  );
};

ContractConfirmationModal.propTypes = {
  contract: T.object.isRequired,
  handleClose: T.func.isRequired,
};

export default ContractConfirmationModal;
