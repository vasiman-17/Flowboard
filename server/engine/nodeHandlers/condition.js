// condition — if/else: evaluates input against a condition
module.exports = async (input, config) => {
  const { operator = 'truthy', value } = config;
  let result;
  switch (operator) {
    case 'truthy':     result = Boolean(input); break;
    case 'falsy':      result = !input; break;
    case '==':         result = input == value; break;
    case '!=':         result = input != value; break;
    case '>':          result = Number(input) > Number(value); break;
    case '<':          result = Number(input) < Number(value); break;
    case '>=':         result = Number(input) >= Number(value); break;
    case '<=':         result = Number(input) <= Number(value); break;
    case 'contains':   result = String(input).includes(String(value)); break;
    case 'startsWith': result = String(input).startsWith(String(value)); break;
    default:           result = Boolean(input);
  }
  return { result, value: input };
};
