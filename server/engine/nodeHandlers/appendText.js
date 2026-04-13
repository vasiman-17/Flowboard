// appendText — appends suffix to input
module.exports = async (input, config) => {
  const str = String(input ?? '');
  return str + (config.suffix ?? '');
};
