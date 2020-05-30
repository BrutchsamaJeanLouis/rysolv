import React, { useState } from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import DepositComponent from './Deposit';
import StatementsComponent from './Statements';
import WithdrawalComponent from './Withdrawal';
import WorkHistoryComponent from './WorkHistory';
import {
  AccountBalanceContainer,
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  BalanceWrapper,
  ComponentWrapper,
  StyledPaper,
  StyledTab,
  StyledTabs,
} from './styledComponents';

const AccountBalance = ({ balance, dollarsEarned, handleNav }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ComponentToRender = {
    0: <DepositComponent handleNav={handleNav} />,
    1: <WithdrawalComponent handleNav={handleNav} />,
    2: <StatementsComponent />,
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
          <StyledTab classes={{ selected: 'selected' }} label="Statements" />
          <StyledTab classes={{ selected: 'selected' }} label="Work History" />
        </StyledTabs>
      </StyledPaper>
      <ComponentWrapper>{ComponentToRender[value]}</ComponentWrapper>
    </AccountBalanceContainer>
  );
};

AccountBalance.propTypes = {
  balance: T.number.isRequired,
  dollarsEarned: T.number.isRequired,
  handleNav: T.func.isRequired,
};

export default AccountBalance;
