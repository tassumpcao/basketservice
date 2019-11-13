/**
 * This is the module responsible to handle the error handling of price API
 *
 */
module.exports = () => {
  /**
 * This is a function responsible to handle the exception and format into the response
 *
 * @param {object} err - error
 * @param {object} res - response
 * @return {Promise} promise
 *
 */
  const handleError = (err, res) => {
    const { code, message } = err;
    return res.status(code)
      .json({
        code,
        message
      });
  };
  return { handleError };
};
