import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';

import {
  defaultFontSize,
  errorBorder,
  inputBorder,
  textColor,
} from 'defaultStyleHelper';

import { FlatIconButton } from '../Buttons';

export const FileInputIcon = styled.label`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  border: 0.2rem solid #1e88e5;
  bottom: -1rem;
  color: #1e88e5;
  display: flex;
  height: 4rem;
  justify-content: center;
  position: absolute;
  right: -1rem;
  width: 4rem;

  &:hover {
    background-color: white;
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const HiddenInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 0.1rem;
  overflow: hidden;
  position: absolute;
  width: 0.1rem;
`;

export const Spacer = styled.div`
  height: 1.5rem;
`;

export const StyledBaseInput = styled(({ textAlign, ...restProps }) => (
  <OutlinedInput {...restProps} />
))`
  background: white;
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: ${defaultFontSize};
  height: 3rem;
  overflow: hidden;
  width: 100%;

  &.adornedStart {
    padding: 0;
  }

  .input {
    padding: 0 2rem;
    text-align: ${({ textAlign }) => textAlign || 'start'};
  }
`;

export const StyledBaseTextInput = styled(TextField)`
  font-size: ${defaultFontSize};
  margin: 0rem 1rem;

  .base-input {
    border-bottom: ${({ error }) => (error ? errorBorder : inputBorder)};
    color: ${textColor};
  }

  .label {
    color: ${textColor};
    font-size: ${defaultFontSize};

    &.focused {
      color: ${textColor};
    }
  }

  .MuiInput-underline {
    border-bottom: ${({ error }) => (error ? errorBorder : inputBorder)};

    &:after {
      border-bottom: none;
    }

    &:before {
      border-bottom: none;
    }
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin-bottom: 0.7rem;
  width: 100%;
`;

export const StyledFlatIcon = styled.div`
  font-size: ${defaultFontSize};

  justify-content: flex-end;
  padding: 0;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  font-size: ${defaultFontSize};

  justify-content: flex-end;
  padding: 0;
`;

export const StyledModalIcon = styled.div`
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 0;
  font-size: ${({ fontSize }) => fontSize || '1.4rem'};
  padding: 2rem 0;
  text-align: center;
  width: 10rem;
`;
