const pino = require('pino');
const errors = require('errors');
const axios = require('axios');

const logger = pino({ level: process.env.LOG_LEVEL || 'fatal' });

module.exports = () => {

  const getRateForCurrency = (currency) => {
    const supportedCurr = ['EUR', 'USD', 'GBP'];
    
    if (!supportedCurr.includes(currency)){
      logger.error(`Currency not supported: ${currency}`);
      throw new errors.Http422Error(`Currency not supported: ${currency}`);
    }

    const url = `${process.env.CURR_API}${currency}`;
    
    return axios.get(url)
      .then((response) => {
        const currData = response.data;
        logger.debug(`currency.getRateForCurrency - quote found successfully: ${currData.quotes[`USD${currency}`]}`);
        return currData.quotes[`USD${currency}`];
      })
      .catch((error) => {
        logger.error(error);
        throw new errors.Http500Error('Error trying to retrieve currency');
      });
  };
  return { getRateForCurrency };
};
