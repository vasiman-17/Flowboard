// uppercase — converts input string to UPPERCASE
module.exports = async (input, config) => {
  if (typeof input !== 'string') throw new Error('uppercase: expected string input');
  return input.toUpperCase();
};
