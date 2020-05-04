/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { issueDataDictionary } from 'containers/Issues/constants';
import { CommentCard } from 'components/Comments';
import { LanguageWrapper, FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  DataWrapper,
  Divider,
  IconWrapper,
  LabelWrapper,
  LanguageContainer,
  NameWrapper,
  RowContainer,
  StyledInlineBlock,
  StyledLink,
  ValueWrapper,
} from './styledComponents';

const LinkIcon = iconDictionary('link');
const CodeIcon = iconDictionary('code');

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const {
      data: { body, fundedAmount, language, name, repo },
      activeUser: { id, profilePic, username },
      handleNav,
    } = this.props;

    const primaryUser = {
      small: true,
      detailRoute: `/users/detail/${id}`,
      alt: username,
      username,
      profilePic,
    };

    return (
      <DataWrapper>
        <LabelWrapper>{issueDataDictionary.name}</LabelWrapper>
        <ValueWrapper>
          <NameWrapper>{name.value}</NameWrapper>
        </ValueWrapper>
        <LabelWrapper>{issueDataDictionary.body}</LabelWrapper>
        <ValueWrapper>
          <CommentCard
            primary
            body={body.value}
            date={Date.now()}
            userProfile={primaryUser}
            handleNav={handleNav}
          />
        </ValueWrapper>
        <ValueWrapper>
          <Divider />
        </ValueWrapper>
        <LabelWrapper>{issueDataDictionary.language}</LabelWrapper>
        <ValueWrapper>
          <LanguageContainer>
            {language.value.map(el => (
              <LanguageWrapper key={el} language={el} />
            ))}
          </LanguageContainer>
        </ValueWrapper>

        <RowContainer>
          <StyledInlineBlock>
            <LabelWrapper>
              <IconWrapper>{CodeIcon}</IconWrapper>
              {issueDataDictionary.repo}
            </LabelWrapper>
            <ValueWrapper>
              <StyledLink>{repo.value}</StyledLink>
            </ValueWrapper>
          </StyledInlineBlock>

          <StyledInlineBlock>
            <LabelWrapper>
              <IconWrapper>{LinkIcon}</IconWrapper>
              <span>{issueDataDictionary.external}</span>
            </LabelWrapper>
            <ValueWrapper>
              <StyledLink>{repo.value}</StyledLink>
            </ValueWrapper>
          </StyledInlineBlock>
        </RowContainer>

        <LabelWrapper>
          <IconWrapper>$</IconWrapper>
          {issueDataDictionary.fundedAmount}
        </LabelWrapper>
        <ValueWrapper>
          <FundingWrapper
            medium
            open
            value={formatDollarAmount(fundedAmount.value)}
          />
        </ValueWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = {
  activeUser: T.object,
  data: T.object,
  handleNav: T.func,
};

export default VerifyForm;
