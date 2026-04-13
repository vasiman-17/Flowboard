// logOutput — console.log on server and pass-through
module.exports = async (input, config) => {
  console.log('[FlowBoard LogOutput]', JSON.stringify(input));
  return input;
};
