import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  StyledHeader,
  StyledSecondayButton,
  StyledSuccessContent,
} from './styledComponents';

const ImportSuccess = ({ handleClose }) => (
  <Fragment>
    <StyledHeader isSuccess>Success!</StyledHeader>
    <StyledSuccessContent>
      Rysolv will keep track of this pull request and automatically credit your
      account when it is merged in.
    </StyledSuccessContent>
    <ButtonGroup>
      <StyledSecondayButton label="Close" onClick={handleClose} />
    </ButtonGroup>
  </Fragment>
);

ImportSuccess.propTypes = {
  handleClose: T.func,
};

export default ImportSuccess;
