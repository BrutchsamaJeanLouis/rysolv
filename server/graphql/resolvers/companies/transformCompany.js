const {
  CustomError,
  errorLogger,
  generateSizeInteger,
} = require('../../../helpers');

const { createStripeCustomer } = require('../../../integrations');

const {
  getOneUserLite,
  transformCompany: transformCompanyQuery,
} = require('../../../db');
const {
  transformCompanyError,
  transformCompanySuccess,
} = require('./constants');
const { uploadImage } = require('../../../middlewares/imageUpload');

const transformCompany = async ({ companyInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const {
      companyId,
      description,
      location,
      name,
      size,
      website,
    } = companyInput;
    let { logo } = companyInput;

    if (logo) {
      const formattedLogo = logo;
      const protocol = formattedLogo.substring(0, 5);

      if (formattedLogo && protocol !== 'https') {
        const { uploadUrl } = await uploadImage(formattedLogo);
        logo = uploadUrl;
      }
    } else {
      logo = undefined;
    }

    const { email, firstName, lastName } = await getOneUserLite({ userId });

    // Create Stripe customer
    const { id: stripeId } = await createStripeCustomer({
      companyId,
      email,
      location,
      name,
      url: website,
      user: `${firstName} ${lastName}`,
      userId,
    });

    const companyData = {
      company_name: name,
      company_url: website,
      created_date: new Date(),
      customer_id: stripeId,
      description,
      id: companyId,
      location,
      logo,
      size: generateSizeInteger({ size }),
    };
    await transformCompanyQuery({ ...companyData });

    return {
      __typename: 'Success',
      message: transformCompanySuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformCompanyError,
    };
  }
};

module.exports = transformCompany;
