import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  CopyrightWrapper,
  Divider,
  FooterWrapper,
  LinkContainer,
  LinkWrapper,
  StyledBottom,
  StyledText,
  StyledTitle,
  StyledTop,
  StyledUrl,
  TextContainer,
} from './styledComponent';

const FacebookIcon = iconDictionary('facebook');
const TwitterIcon = iconDictionary('twitter');

const Footer = () => (
  <FooterWrapper>
    <StyledTop>
      <TextContainer>
        <StyledTitle>rysolv</StyledTitle>
        <div>Fixing the internet. One bug at a time.</div>
      </TextContainer>
      <div>
        <StyledUrl href="https://facebook.com/rysolv" target="_blank">
          {FacebookIcon}
        </StyledUrl>
        <StyledUrl href="https://twitter.com/rysolv" target="_blank">
          {TwitterIcon}
        </StyledUrl>
      </div>
    </StyledTop>
    <Divider />
    <StyledBottom>
      <LinkContainer>
        <LinkWrapper href="/contactus">Contact Us</LinkWrapper>
      </LinkContainer>
      <CopyrightWrapper>
        <div>{`© ${new Date().getFullYear()} Rysolv, LLC`}</div>
        <StyledText>|</StyledText>
        <div>All rights reserved</div>
      </CopyrightWrapper>
    </StyledBottom>
  </FooterWrapper>
);

export default Footer;
