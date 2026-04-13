// replaceText — replaces all occurrences of find with replace
module.exports = async (input, config) => {
  if (typeof input !== 'string') throw new Error('replaceText: expected string input');
  const { find = '', replace = '' } = config;
  return input.split(find).join(replace);
};
