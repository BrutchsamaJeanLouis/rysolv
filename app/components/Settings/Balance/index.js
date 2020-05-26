import React, { useState } from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import DepositComponent from './DepositComponent';
import InvoicesComponent from './InvoicesComponent';
import WithdrawalComponent from './WithdrawalComponent';
import WorkHistoryComponent from './WorkHistoryComponent';
import {
  AccountBalanceContainer,
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  BalanceWrapper,
  StyledPaper,
  StyledTab,
  StyledTabs,
} from './styledComponents';

const AccountBalance = ({ balance, dollarsEarned }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ComponentToRender = {
    0: <DepositComponent />,
    1: <WithdrawalComponent />,
    2: <InvoicesComponent />,
    3: <WorkHistoryComponent />,
  };
  return (
    <AccountBalanceContainer>
      <BalanceWrapper>
        <BalanceSquare>
          <BalanceTitle>Current earned balance</BalanceTitle>
          <BalanceAmount>
            {dollarsEarned ? formatDollarAmount(dollarsEarned) : '–'}
          </BalanceAmount>
        </BalanceSquare>
        <BalanceSquare>
          <BalanceTitle>Current account balance</BalanceTitle>
          <BalanceAmount>
            {balance ? formatDollarAmount(balance) : '–'}
          </BalanceAmount>
        </BalanceSquare>
      </BalanceWrapper>
      <StyledPaper>
        <StyledTabs
          classes={{ indicator: 'indicator' }}
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}
        >
          <StyledTab classes={{ selected: 'selected' }} label="Deposit" />
          <StyledTab classes={{ selected: 'selected' }} label="Withdrawal" />
          <StyledTab classes={{ selected: 'selected' }} label="Invoices" />
          <StyledTab classes={{ selected: 'selected' }} label="Work History" />
        </StyledTabs>
      </StyledPaper>
      {ComponentToRender[value]}
    </AccountBalanceContainer>
  );
};

AccountBalance.propTypes = {
  balance: T.number.isRequired,
  dollarsEarned: T.number.isRequired,
};

export default AccountBalance;
