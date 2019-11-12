const errors = require('errors');
const axios = require('axios');

module.exports = () => {

  const getRateForCurrency = (currency) => {
    const supportedCurr = ['EUR', 'USD', 'GBP'];

    if (!supportedCurr.includes(currency))
      throw new errors.Http422Error(`Currency not supported: ${currency}`);
    const url = `${process.env.CURR_API}${currency}`;
    
    return axios.get(url)
      .then((response) => {
        const currData = response.data;
        return currData.quotes[`USD${currency}`];
      })
      .catch(() => {
        throw new errors.Http500Error('Error trying to retrieve currency');
      });
  };
  return { getRateForCurrency };
};