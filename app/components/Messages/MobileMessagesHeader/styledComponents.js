import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { blueColor, textColor } from 'defaultStyleHelper';

export const HeaderWrapper = styled.div`
  align-items: center;
  color: ${blueColor};
  display: flex;
  font-size: 2rem;
  font-weight: 700;
  height: 4rem;
  left: 3rem;
  overflow: hidden;
  position: absolute;
  right: 3rem;
  text-overflow: ellipsis;
  top: 0;
  white-space: nowrap;
`;

export const StyledIconButton = styled(IconButton)`
  padding-left: 0;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${blueColor};
    height: 2rem;
    width: 2rem;
  }
`;

export const ThreadDescription = styled.span`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  height: 100%;
  line-height: 1.936rem;
  padding: 0.4rem 0 0 1.2rem;
`;
