import React from 'react';
import T from 'prop-types';
import { MainTextInput } from 'components/base_ui';
import LanguageAutocomplete from 'components/LanguageAutocomplete';
import { issueDataDictionary } from 'containers/Issues/constants';
import Markdown from 'components/Markdown';
import { InputFormWrapper, StyledMarkdownWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { body, issueUrl, language, name } = data;

  const handleMarkdownInput = markdown => {
    handleInputChange({
      field: 'body',
      form: 'data',
      value: markdown,
    });
  };

  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!name.error}
        helperText={name.error}
        label={issueDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'name',
            form: 'data',
            value: e.target.value,
          })
        }
        value={name.value}
      />
      <StyledMarkdownWrapper>
        {issueDataDictionary.body}
        <Markdown edit body={body.value} handleInput={handleMarkdownInput} />
      </StyledMarkdownWrapper>

      <MainTextInput
        error={!!issueUrl.error}
        helperText={issueUrl.error}
        label={issueDataDictionary.issueUrl}
        onChange={e =>
          handleInputChange({
            field: 'issueUrl',
            form: 'data',
            value: e.target.value,
          })
        }
        value={issueUrl.value}
      />

      <LanguageAutocomplete
        error={!!language.error}
        helperText={language.error}
        label={issueDataDictionary.language}
        // eslint-disable-next-line no-shadow
        onChange={(e, value) =>
          handleInputChange({
            field: 'language',
            form: 'data',
            value,
          })
        }
        value={language.value}
      />
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;
