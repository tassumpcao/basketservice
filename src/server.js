/* eslint-disable no-console */
const app = require('./app');

const port = 3000;

app.listen(port, () => {
  console.log(`Server alive on port ${port}!`);
});
