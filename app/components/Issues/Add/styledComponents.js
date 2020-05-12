import styled from 'styled-components';

import { defaultFontSize, hyperlinkColor, textColor } from 'defaultStyleHelper';

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImportFormContainer = styled.section`
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 2.4rem;
  font-weight: 300;
  height: 50%;
  line-height: 4rem;
  margin: auto;
  padding: 5rem 0;
  text-align: center;
  width: 50%;
`;

export const InputFormWrapper = styled.div`
  padding: 0 2rem;
`;

export const KeyAndValueContainer = styled.div`
  display: flex;
`;

export const KeyGroupWrapper = styled.div`
  padding-right: 2rem;
`;

export const KeyWrapper = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
  text-decoration: underline;
  min-width: 15rem;
`;

export const StyledMarkdownWrapper = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  color: ${textColor};
`;

export const StyledLabel = styled.div`
  color: ${hyperlinkColor};

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ValueWrapper = styled.div`
  display: flex;
  color: ${textColor};
  flex-direction: row;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
`;
