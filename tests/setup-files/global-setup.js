const dotEnv = require('dotenv');

const nodeEnv = process.env.NODE_ENV || 'development';

const setup = async () => {
  dotEnv.config({
    path: `config/.env.${nodeEnv}`
  });
};

module.exports = setup;