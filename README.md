# checkout-service

It's a service that handles all logic to calculate the amount for a list of items and convert to a currency using a API from currency layer.

## Scripts

- `npm start` to start the service
- `npm run test` to run all tests
- `npm run test-integration` to run integration tests
- `npm run test-unit` to run unit tests
- `npm run test-unit-watch` will run unit tests and will rerun the tests if any file is modified
- `npm run lint` will run all lint tests

## Environment Variables

For our service to work propertly in our local env it's necessary to configure the required environment vars. In order to simplify this `dotenv` module is been used.

`Dontenv` needs a `.env` file with the env vars. Set the env variable for the correct environment defined on /config folder