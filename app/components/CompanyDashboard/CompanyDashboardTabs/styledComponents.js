import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { blueColor, grayColor } from 'defaultStyleHelper';

export const StyledTab = styled(Tab)`
  color: ${blueColor};
  font-size: 1.6rem;

  &.selected {
    color: ${blueColor};
    font-weight: 700;
  }
`;

export const StyledTabs = styled(Tabs)`
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.4rem ${grayColor};
  margin-right: 1rem;
  padding: 0 1rem;

  .indicator {
    background-color: ${blueColor};
    height: 0.3rem;
  }
`;
