/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { companyDataDictionary } from 'containers/Companies/constants';

import {
  DataWrapper,
  KeyAndValueContainer,
  KeyGroupWrapper,
  KeyWrapper,
  ValueWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const { data } = this.props;
    const tempData = { ...data };
    delete tempData.importUrl;
    return (
      <DataWrapper>
        <KeyGroupWrapper>
          {Object.keys(tempData).map((key, index) => (
            <KeyAndValueContainer>
              <KeyWrapper key={`verify-key-${key}-${index}`}>
                {companyDataDictionary[key]}:
              </KeyWrapper>
              <ValueWrapper key={`verify-value-${key}-${index}`}>
                {tempData[key].value}
              </ValueWrapper>
            </KeyAndValueContainer>
          ))}
        </KeyGroupWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = { data: T.object };

export default VerifyForm;
