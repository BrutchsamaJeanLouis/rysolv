import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import { defaultFontSize, hyperlinkColor } from 'defaultStyleHelper';

export const StyledBack = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  text-align: center;
`;

export const StyledCode = styled.div`
  color: white;
`;

export const StyledComment = styled.div`
  color: inherit;
  display: inline-block;
  text-align: center;
`;

export const StyledDownArrow = styled.div`
  display: inline-block;

  svg {
    height: 3rem;
    width: 3rem;
  }
  &:hover {
    color: #b0bec5;
  }
`;

export const StyledSettings = styled.div`
  color: #424242;
  display: inline-block;
  text-align: center;

  &:hover {
    color: ${hyperlinkColor};
    cursor: pointer;
  }
`;

export const StyledStar = styled.div`
  color: #ffd600;
  display: inline-block;
  text-align: center;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledVerified = styled.div`
  color: rgb(8, 178, 110);
  display: inline-block;
  text-align: center;
`;

export const StyledUpvote = styled.div`
  color: #37474f;
  display: inline-block;
  text-align: center;
  * {
    font-size: large;
  }

  &:hover {
    color: #ff5722;
    cursor: pointer;
  }
`;

export const StyledIconTooltip = styled(Tooltip)`
  .MuiTooltip-popper {
    font-size: ${defaultFontSize};
  }
  display: inline-block;
`;

export const StyledMonocleIcon = styled.div`
  color: inherit;
  display: inline-block;
  text-align: center;
  * {
    fill: inherit;
    stroke: inherit;
    stroke-width: 150;
  }
`;
