// jsonInput — ignores input, returns parsed JSON from config
module.exports = async (input, config) => {
  try {
    return typeof config.value === 'string' ? JSON.parse(config.value) : config.value ?? {};
  } catch {
    throw new Error('Invalid JSON in JsonInput node');
  }
};
