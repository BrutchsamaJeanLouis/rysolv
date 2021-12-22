const { singleQuery } = require('../../baseQueries');

// GET user company
const getUserCompany = async ({ userId }) => {
  const queryText = `
    SELECT
      c.company_name AS name,
      c.company_url AS website,
      c.customer_id AS "customerId",
      c.description,
      c.id,
      c.location,
      c.logo,
      c.payment_method AS "paymentMethod",
      c.payment_set_date AS "paymentSetDate",
      c.size,
      lc.contract_key AS "contract",
      sc.created_date AS "contractAcceptedDate"
    FROM companies c
    JOIN user_companies uc ON c.id = uc.company_id
    LEFT JOIN signed_contracts sc ON sc.company_id = c.id
    LEFT JOIN legal_contracts lc on lc.id = sc.contract_id
    WHERE uc.user_id = $1
    ORDER BY sc.created_date DESC
    LIMIT 1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserCompany;
