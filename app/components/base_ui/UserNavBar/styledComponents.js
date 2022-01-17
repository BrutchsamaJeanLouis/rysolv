import styled from 'styled-components';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const Notification = styled.div`
  background: linear-gradient(#f44336 0%, #b71c1c 100%);
  border-radius: 50%;
  display: ${({ notifications }) => (notifications ? 'block' : 'none')};
  height: 1.1rem;
  position: absolute;
  right: 5rem;
  top: 1.25rem;
  width: 1.1rem;

  ${mobile} {
    right: 4.25rem;
    top: 1.1rem;
  }
`;

export const StyledAvatar = styled.img`
  border-radius: 50%;
  display: inline-flex;
  height: 3.5rem;
  width: 3.5rem;
`;

export const StyledUserNavBar = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  margin: 0.25rem 1rem;

  &:hover {
    cursor: pointer;
  }
`;
