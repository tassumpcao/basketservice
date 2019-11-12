
module.exports = () => {
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