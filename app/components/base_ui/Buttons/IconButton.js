import React from 'react';
import T from 'prop-types';
import { IconButton as MuiIconButton, Tooltip } from '@material-ui/core';

const IconButton = ({ icon, label, onClick, ...restProps }) => (
  <Tooltip title={label}>
    <MuiIconButton onClick={onClick} size="small" {...restProps}>
      {icon}
    </MuiIconButton>
  </Tooltip>
);

IconButton.propTypes = {
  icon: T.object.isRequired,
  label: T.string.isRequired,
  onClick: T.func.isRequired,
};

export default IconButton;
