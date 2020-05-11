import styled from 'styled-components';
import {
  defaultFontSize,
  headerColor,
  hoverLinkColor,
} from 'defaultStyleHelper';

export const StyledSideNav = styled.div`
  .MuiDrawer-paper {
    background: transparent;
    border: none;
    color: ${headerColor};
    height: auto;
    margin-top: 6rem;
    overflow: hidden;
  }

  .MuiListItem-root {
    padding-left: 3rem;
  }

  .MuiTypography-root {
    font-size: ${defaultFontSize};
  }

  .MuiButtonBase-root {
    border-radius: 0;
  }

  .MuiSvgIcon-root {
    height: 2rem;
    width: 2rem;
  }

  .MuiSvgIcon-root {
    color: ${headerColor};
  }

  .MuiIconButton-label {
    justify-content: end;
    padding-left: 2.1rem;
  }
`;

export const StyledListWrapper = styled.div`
  color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};
  .MuiSvgIcon-root {
    color: ${({ active }) => (active ? hoverLinkColor : 'inherit')};
  }
`;
