/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';

import LanguageAutocomplete from 'components/LanguageAutocomplete';
import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { blueColorSpectrum } from './constants';
import {
  Icon,
  Language,
  LanguageWrapper,
  StyledLanguageAutocomplete,
  StyledText,
  StyledTitled,
  TopLanguagesContainer,
} from './styledComponents';

const CircleIcon = iconDictionary('circle');

export class TopLanguagesView extends React.PureComponent {
  render() {
    const {
      displayEditView,
      languagesChange,
      preferredLanguages,
      setLanguagesChange,
    } = this.props;

    const EditLanguagesComponent = (
      <StyledLanguageAutocomplete>
        <LanguageAutocomplete
          onChange={(e, value) =>
            setLanguagesChange(() => value.map(el => el.value))
          }
          value={languagesChange.map(el => ({
            value: el,
          }))}
        />
      </StyledLanguageAutocomplete>
    );

    const LanguagesComponent = (
      <ConditionalRender
        Component={
          <LanguageWrapper>
            {preferredLanguages.map((language, index) => (
              <Language key={`list-item-${index}`}>
                <Icon color={blueColorSpectrum[index]}>{CircleIcon}</Icon>
                {language}
              </Language>
            ))}
          </LanguageWrapper>
        }
        FallbackComponent={<StyledText>None yet</StyledText>}
        shouldRender={!!preferredLanguages.length}
      />
    );

    return (
      <Fragment>
        <TopLanguagesContainer>
          <StyledTitled>Top languages</StyledTitled>
          <ConditionalRender
            Component={LanguagesComponent}
            FallbackComponent={EditLanguagesComponent}
            shouldRender={!displayEditView}
          />
        </TopLanguagesContainer>
      </Fragment>
    );
  }
}

TopLanguagesView.propTypes = {
  displayEditView: T.bool,
  languagesChange: T.array,
  preferredLanguages: T.array,
  setLanguagesChange: T.func,
};

export default TopLanguagesView;
