import React from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  ImportantTextWrapper,
  InputFormContent,
  InputFormWrapper,
  InputSubText,
  SigninWrapper,
  StyledButton,
  StyledPrimaryButton,
  Title,
} from '../styledComponents';

const Redirect = ({
  data: { company, username },
  dispatchSignOut,
  handleNav,
}) => {
  const path = company ? '/company/dashboard' : '/dashboard';
  const handleSignout = () => {
    dispatchSignOut();
    handleNav('/signin');
  };
  return (
    <SigninWrapper>
      <InputFormWrapper>
        <InputFormContent>
          <Title hasSubText>Return to your account</Title>
          <InputSubText hasFlex>
            You are already logged in as{' '}
            <ImportantTextWrapper>{username}</ImportantTextWrapper>.
          </InputSubText>
        </InputFormContent>
        <ButtonWrapper>
          <StyledPrimaryButton
            autoFocus
            disableFocusRipple
            label="Go to your Dashboard"
            onClick={() => handleNav(path)}
          />
          <StyledButton disableFocusRipple onClick={handleSignout}>
            Sign out
          </StyledButton>
        </ButtonWrapper>
      </InputFormWrapper>
    </SigninWrapper>
  );
};

Redirect.propTypes = {
  data: T.object.isRequired,
  dispatchSignOut: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default Redirect;
