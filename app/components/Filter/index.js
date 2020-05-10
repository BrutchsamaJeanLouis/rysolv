import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  BaseAutocomplete,
  BaseSlider,
  CheckboxWithLabel,
} from 'components/base_ui';

import { FilterContainer, StyledLabel, StyledTitle } from './styledComponents';

const statusOptions = ['Closed', 'Funded', 'Unfunded'];
const typeOptions = ['Bug', 'Feature'];

const Filter = ({
  filterValues: { language, organization, price, status, type },
  handleChangeFilter,
  languageOptions,
  organizationOptions,
}) => (
  <FilterContainer>
    <StyledTitle>Filters</StyledTitle>
    {language && (
      <Fragment>
        <StyledLabel>Language</StyledLabel>
        <BaseAutocomplete
          onChange={(e, value) =>
            handleChangeFilter({ field: 'language', value })
          }
          options={languageOptions}
        />
      </Fragment>
    )}
    {organization && (
      <Fragment>
        <StyledLabel>Organization</StyledLabel>
        <BaseAutocomplete
          onChange={(e, value) =>
            handleChangeFilter({ field: 'organization', value })
          }
          options={organizationOptions}
        />
      </Fragment>
    )}
    {price && (
      <Fragment>
        <StyledLabel>Price Range</StyledLabel>
        <BaseSlider
          max={5000}
          min={0}
          onChange={(e, value) => handleChangeFilter({ field: 'price', value })}
          value={price}
        />
      </Fragment>
    )}
    {status && (
      <Fragment>
        <StyledLabel>Status</StyledLabel>
        {statusOptions.map(value => (
          <CheckboxWithLabel
            checked={status[value]}
            label={value}
            onChange={() => handleChangeFilter({ field: 'status', value })}
          />
        ))}
      </Fragment>
    )}
    {type && (
      <Fragment>
        <StyledLabel>Type</StyledLabel>
        {typeOptions.map(value => (
          <CheckboxWithLabel
            checked={type[value]}
            label={value}
            onChange={e =>
              handleChangeFilter({ field: 'status', value: e.target.value })
            }
          />
        ))}
      </Fragment>
    )}
  </FilterContainer>
);

Filter.propTypes = {
  filterValues: T.object,
  handleChangeFilter: T.func,
  languageOptions: T.array,
  organizationOptions: T.array,
};

export default Filter;
