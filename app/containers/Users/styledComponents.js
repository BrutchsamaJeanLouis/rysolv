import React from 'react';
import styled from 'styled-components';

export const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 1rem 0;
`;

export const StyledImage = styled.img`
  height: 5rem;
  width: 5rem;
`;

export const ImageContainer = styled.div`
  align-self: center;
  text-align: center;
  width: 20%;
`;

export const InfoContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const NameWrapper = styled.div`
  font-size: 1.2rem;
`;

export const DescriptionWrapper = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`;

export const ButtonContainer = styled.div`
  align-self: center;
  padding: 1rem;
`;

export const Divider = styled(({ isLastItem, ...restProps }) => (
  <div {...restProps} />
))`
  border-bottom: ${({ isLastItem }) =>
    isLastItem ? 'none' : '0.1rem solid grey'};
  display: flex;
  margin: auto;
  width: 90%;
`;
