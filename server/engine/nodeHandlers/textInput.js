// textInput — ignores input, returns its configured value
module.exports = async (input, config) => {
  return config.value ?? '';
};
