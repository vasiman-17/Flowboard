// parseJson — parses a JSON string into an object
module.exports = async (input, config) => {
  try {
    return typeof input === 'string' ? JSON.parse(input) : input;
  } catch {
    throw new Error('parseJson: input is not valid JSON');
  }
};
