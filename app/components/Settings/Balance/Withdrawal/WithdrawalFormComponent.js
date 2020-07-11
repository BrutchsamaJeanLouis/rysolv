/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import { BackNav } from 'components/base_ui';
import { transferValueLowErrorMessage } from 'containers/Settings/constants';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  DisplayText,
  Divider,
  InputHeader,
  StyledBaseDropDownMenu,
  StyledBaseInput,
  StyledFormHelperText,
  StyledPrimaryAsyncButton,
  StyledText,
  WithdrawalInputContainer,
  WithdrawalInputWrapper,
} from '../styledComponents';
import { StyledH3 } from '../../styledComponents';

const WithdrawalFormComponent = ({
  balance,
  dispatchInputError,
  handleNav,
  handleWithdrawFunds,
  inputErrors: { transferValue: transferValueError },
  setDisplayBottom,
  userId,
}) => {
  const [transferLocation, setTransferLocation] = useState('PayPal');
  const [transferValue, setTransferValue] = useState('0');

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => setDisplayBottom(false);
  }, []);

  const handleChangeDollarValue = e => {
    const { value } = e.target;
    if (value <= balance) {
      const string = value
        ? value
          .replace(',', '.')
          .replace(/[^\d.]/g, '')
          .replace(/\./, 'x')
          .replace(/\./g, '')
          .replace(/x/, '.')
        : '0';
      const formattedString =
        string.length === 1
          ? string.split('.')
          : string.replace(/^0+/, '').split('.');

      if (formattedString.length === 1) {
        const formattedValue = formattedString.join('.');
        setTransferValue(formattedValue);
      }
      if (formattedString.length === 2) {
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setTransferValue(formattedValue);
      }
    }
  };

  const handleValidateInput = ({ field, value }) => {
    if (field === 'transferValue') {
      if (value > 0) {
        dispatchInputError({ field, message: '' })
      } else {
        dispatchInputError({ field, message: transferValueLowErrorMessage })
      }
    }
  };
  return (
    <Fragment>
      <BackNav
        label="Back to Account"
        handleNav={handleNav}
        path="/settings/account"
      />
      <StyledH3>Withdraw funds</StyledH3>
      <StyledText>
        Funds earned on the Rysolv platform are available for withdrawal via
        PayPal account.
      </StyledText>
      <BalanceSquare isCentered>
        <BalanceTitle>Available to withdraw</BalanceTitle>
        <BalanceAmount>
          {balance ? `${formatDollarAmount(balance)} USD` : '–'}
        </BalanceAmount>
      </BalanceSquare>
      <WithdrawalInputContainer>
        <WithdrawalInputWrapper>
          <InputHeader>Transfer to:</InputHeader>
          <StyledBaseDropDownMenu
            handleChange={value => setTransferLocation(value)}
            selectedValue={transferLocation}
            values={['PayPal']}
          />
        </WithdrawalInputWrapper>
        <WithdrawalInputWrapper>
          <InputHeader>Amount to withdraw:</InputHeader>
          <StyledBaseInput
            inputProps={{ maxLength: 7 }}
            onBlur={() => handleValidateInput({ field: 'transferValue', value: transferValue })}
            onChange={e => handleChangeDollarValue(e)}
            value={transferValue}
          />
          <StyledFormHelperText error={!!transferValueError}>{transferValueError}</StyledFormHelperText>
        </WithdrawalInputWrapper>
      </WithdrawalInputContainer>
      <Divider />
      <WithdrawalInputContainer>
        <WithdrawalInputWrapper isRow isThin>
          <InputHeader>15% Rysolv Service Fee:</InputHeader>
          <DisplayText>{formatDollarAmount(transferValue * 0.15)}</DisplayText>
        </WithdrawalInputWrapper>
        <WithdrawalInputWrapper isRow>
          <InputHeader>Transfer to PayPal:</InputHeader>
          <DisplayText>
            {transferValue > 0
              ? `${formatDollarAmount(
                transferValue - transferValue * 0.15,
              )} USD`
              : '–'}
          </DisplayText>
        </WithdrawalInputWrapper>
      </WithdrawalInputContainer>
      <StyledPrimaryAsyncButton
        disabled={!!transferValueError || transferValue <= 0}
        label="Withdraw Funds"
        onClick={() =>
          handleWithdrawFunds({ transferValue, userId })
        }
      />
    </Fragment>
  );
};

WithdrawalFormComponent.propTypes = {
  balance: T.number.isRequired,
  dispatchInputError: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleWithdrawFunds: T.func.isRequired,
  inputErrors: T.object.isRequired,
  setDisplayBottom: T.func.isRequired,
  userId: T.string.isRequired,
};

export default WithdrawalFormComponent;
