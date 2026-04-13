export const getDefaultData = (type) => {
  const defaults = {
    textInput:     { value: '' },
    numberInput:   { value: 0 },
    jsonInput:     { value: '{}' },
    uppercase:     {},
    lowercase:     {},
    appendText:    { suffix: '' },
    replaceText:   { find: '', replace: '' },
    parseJson:     {},
    condition:     { operator: 'truthy', value: '' },
    compare:       { operator: '==', value: '' },
    displayOutput: {},
    logOutput:     {},
  };
  return defaults[type] || {};
};
