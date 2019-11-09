const dotenv = require('dotenv');
const express = require('express');
const router = require('router');

const nodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: `config/.env.${nodeEnv}`,
});

const app = express();

app.use('/api/v1', router);

module.exports = app;
