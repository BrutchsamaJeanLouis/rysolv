import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  subheaderFontSize,
  textColor,
  headerColor,
} from 'defaultStyleHelper';

export const ContentContainer = styled.div`
  display: flex;
`;

export const DateWrapper = styled.div`
  align-self: center;
  font-size: ${detailFontSize};
  padding: 1rem;
`;

export const DescriptionWrapper = styled.div`
  font-size: ${defaultFontSize};
  padding: 1rem 1rem 1rem 0;
  width: 100%;
`;

export const ImageContainer = styled.div`
  min-width: 15%;
  text-align: center;
`;

export const NameWrapper = styled.div`
  color: ${headerColor};
  font-size: ${subheaderFontSize};
  margin: 1rem;

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
`;

export const StatsWrapper = styled.div`
  font-size: ${detailFontSize};
  padding: 1rem 0;
`;

export const StyledImage = styled.img`
  height: 5rem;
  margin: 1rem;
  width: 5rem;
`;
export const StyledListItem = styled.li`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  color: ${textColor};
  display: flex;
  flex-direction: row;
  height: auto;
  margin: 0.5rem 1rem;
`;
export const StyledOrganizationCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSettingWrapper = styled.div`
  padding: 1rem;
`;

export const TextContainer = styled.div`
  padding: 0 3rem 0 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
