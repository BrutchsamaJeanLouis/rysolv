import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AddContainer,
  IconContainer,
  ImportCardWrapper,
  StyledLinkContainer,
  StyledRepoBody,
  StyledRepoHeader,
  StyledRepoTitle,
} from './styledComponents';

const AddBox = iconDictionary('addBox');
const GithubIcon = iconDictionary('github');

const ImportPullRequestCard = ({
  exists,
  handleInputChange,
  htmlUrl,
  modifiedDate,
  pullNumber,
  title,
}) => {
  const handleImport = () => {
    if (!exists) {
      handleInputChange({
        field: 'importUrl',
        form: 'importData',
        value: htmlUrl,
      });
    }
  };

  return (
    <ImportCardWrapper>
      <StyledRepoBody>
        <StyledRepoHeader>
          {moment.utc(modifiedDate).fromNow()}
        </StyledRepoHeader>
        <StyledRepoTitle>
          <IconContainer>{GithubIcon}</IconContainer>
          <StyledLinkContainer>
            <a href={htmlUrl} target="_blank">
              {title} #{pullNumber}
            </a>
          </StyledLinkContainer>
        </StyledRepoTitle>
      </StyledRepoBody>
      <IconToolTip disabled={!exists} toolTipText="Already imported">
        <AddContainer disabled={exists} onClick={handleImport}>
          {AddBox}
        </AddContainer>
      </IconToolTip>
    </ImportCardWrapper>
  );
};

ImportPullRequestCard.propTypes = {
  exists: T.bool.isRequired,
  handleInputChange: T.func.isRequired,
  htmlUrl: T.string.isRequired,
  modifiedDate: T.string.isRequired,
  pullNumber: T.number.isRequired,
  title: T.string.isRequired,
};

export default ImportPullRequestCard;
