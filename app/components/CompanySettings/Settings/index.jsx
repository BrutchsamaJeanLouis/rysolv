import React, { useEffect } from 'react';
import T from 'prop-types';

import CompanySettingsInput from './CompanySettingsInput';
import {
  CompanySettingsContainer,
  CompanySettingsHeader,
} from '../styledComponents';

const CompanySettings = ({
  dispatchChangeInput,
  form,
  formErrors,
  handleEditUser,
  handleValidateInput,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Account & Settings';
  }, []);

  return (
    <CompanySettingsContainer>
      <CompanySettingsHeader>User details</CompanySettingsHeader>
      {Object.keys(form).map(field => {
        const handleChangeInput = value => {
          dispatchChangeInput({
            form: 'form',
            field,
            value,
          });
        };

        return (
          <CompanySettingsInput
            error={formErrors[field]}
            field={field}
            handleChangeInput={handleChangeInput}
            handleEditUser={handleEditUser}
            key={`input-${field}`}
            onBlur={() =>
              handleValidateInput({
                field,
                values: form,
              })
            }
            value={form[field]}
          />
        );
      })}
    </CompanySettingsContainer>
  );
};

CompanySettings.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleEditUser: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
};

export default CompanySettings;
