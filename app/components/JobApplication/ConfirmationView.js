import React from 'react';

import {
  IconWrapper,
  LinkWrapper,
  StyledParagraph,
  ViewContainer,
} from './styledComponents';

const ConfirmationView = () => (
  <ViewContainer isFinalView>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Success! Let&#39;s match you with companies.
    </StyledParagraph>
    <p>
      We have received your responses and look forward to talking with you soon.
      In the meantime, continue growing your profile by resolving&nbsp;
      <LinkWrapper to="/issues">issues</LinkWrapper>. See how we&nbsp;
      <LinkWrapper to="/how-we-score-code">score candidates</LinkWrapper>.
    </p>
  </ViewContainer>
);

export default ConfirmationView;
