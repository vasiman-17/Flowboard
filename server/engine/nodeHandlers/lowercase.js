// lowercase — converts input string to lowercase
module.exports = async (input, config) => {
  if (typeof input !== 'string') throw new Error('lowercase: expected string input');
  return input.toLowerCase();
};
