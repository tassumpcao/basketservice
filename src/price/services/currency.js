module.exports = () => {
  
  const convert = (order, currency) => {
    return { finalOrder: order, curr: currency };
  };
  
  return { convert };
};
