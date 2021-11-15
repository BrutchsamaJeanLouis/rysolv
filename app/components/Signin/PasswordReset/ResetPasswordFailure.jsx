import React, { useEffect } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  InputFormContent,
  InputFormWrapper,
  SigninWrapper,
  StyledPrimaryButton,
  Title,
} from '../styledComponents';
import { IconWrapper, MessageWrapper, ResetSubText } from './styledComponents';

const ErrorIcon = iconDictionary('errorOutline');

const ResetPasswordFailure = ({ error: { message }, handleReturnToSignIn }) => {
  useEffect(() => document.getElementById('resetFailed').focus(), []);
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleReturnToSignIn();
    }
  };
  return (
    <SigninWrapper
      id="resetFailed"
      onKeyDown={e => handleKeypress(e)}
      tabIndex="0"
    >
      <InputFormWrapper>
        <Title hasSubText>Password reset failed</Title>
        <InputFormContent>
          <ResetSubText hasFlex>
            <IconWrapper isError>{ErrorIcon}</IconWrapper>
            <MessageWrapper>{message}</MessageWrapper>
          </ResetSubText>
          <StyledPrimaryButton
            label="Return to sign in"
            onClick={handleReturnToSignIn}
          />
        </InputFormContent>
      </InputFormWrapper>
    </SigninWrapper>
  );
};

ResetPasswordFailure.propTypes = {
  error: T.oneOfType([T.bool, T.object]).isRequired,
  handleReturnToSignIn: T.func.isRequired,
};

export default ResetPasswordFailure;
