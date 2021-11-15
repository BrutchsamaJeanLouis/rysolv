import styled, { css } from 'styled-components';

import { BaseAutocomplete, BaseFileInput } from 'components/base_ui';
import {
  candidateGreyColor,
  defaultFontSize,
  lightBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  min-height: ${({ height, multiple }) => (multiple ? height : 'auto')};
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

export const Autocomplete = styled(BaseAutocomplete)`
  ${baseInputStyle};
  align-items: center;
  display: flex;
  padding: 0;

  .inputRoot {
    &:after,
    &:before {
      border-bottom: none;
    }
    border-bottom: none;
    padding: 0 2.4rem;
  }

  .MuiAutocomplete-clearIndicator {
    display: none;
  }

  .MuiAutocomplete-endAdornment {
    right: 1rem;
  }

  .MuiFormControl-root {
    margin: 0;
  }

  .MuiInputBase-input {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.6rem;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  .tag {
    background-color: #ecf3fc;
    border-radius: 0.7rem;

    &.deletable {
      background-color: #ecf3fc;

      &:focus {
        background-color: #ecf3fc;
      }
    }

    .MuiChip-label {
      color: ${lightBlueColor};
      font-size: ${defaultFontSize};
      font-weight: 400;
    }

    svg {
      color: #a2c6f0;
      height: 2rem;
      width: 2rem;

      &:hover {
        color: #a2c6f0;
      }
    }
  }
`;

export const FileInputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const PreviewDisplay = styled.img`
  background: ${candidateGreyColor};
  border-radius: 50%;
  height: 12.5rem;
  width: 12.5rem;
`;

export const StyledBaseFileInput = styled(BaseFileInput)`
  background: transparent;
  border-color: ${candidateGreyColor};
  height: 12.5rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 12.5rem;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${({ $hasInput }) => ($hasInput ? 'transparent' : whiteColor)};
    height: 3.4rem;
    width: 3.4rem;
  }
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
`;
