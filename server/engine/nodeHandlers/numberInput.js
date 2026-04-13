// numberInput — ignores input, returns configured number
module.exports = async (input, config) => {
  return Number(config.value ?? 0);
};
