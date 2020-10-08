/* eslint-disable consistent-return */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { calculateTotalAmount } = require('../../../constants');
const { createActivity } = require('../activity');
const {
  createStripePaymentError,
  depositSuccess,
  greaterThanError,
  stripePaymentSuccess,
} = require('./constants');
const {
  submitAccountDepositUser,
  submitExternalPayment,
} = require('../../../db');

const createStripeCharge = async ({ amount, issueId, token, userId }) => {
  try {
    const totalAmount = calculateTotalAmount(amount);
    if (amount < 100) {
      const error = new Error();
      error.message = greaterThanError;
      throw error;
    }
    await stripe.charges.create({
      amount: totalAmount,
      currency: 'usd',
      description: 'Customer charge',
      source: token,
    });

    if (issueId) {
      const { fundedAmount, organizationId } = await submitExternalPayment({
        fundValue: amount,
        issueId,
      });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        issueId,
        organizationId,
      };
      await createActivity({ activityInput });

      return {
        __typename: 'Payment',
        fundedAmount,
        message: stripePaymentSuccess,
      };
    }
    if (userId) {
      const userResult = await submitAccountDepositUser({ amount, userId });

      const activityInput = {
        actionType: 'fund',
        fundedValue: amount,
        userId,
      };
      await createActivity({ activityInput });

      return {
        __typename: 'Payment',
        balance: userResult.balance,
        message: depositSuccess,
      };
    }
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || createStripePaymentError({ issueId }),
    };
  }
};

module.exports = createStripeCharge;
