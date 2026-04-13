const nodeRegistry = [
  // ── INPUT NODES ──────────────────────────────────────────────────────────
  {
    type: 'textInput',
    category: 'Input',
    label: 'Text Input',
    description: 'Provides a static text string as output',
    inputs: [],
    outputs: ['output'],
    configFields: [
      { key: 'value', label: 'Text', type: 'textarea', default: '' }
    ],
  },
  {
    type: 'numberInput',
    category: 'Input',
    label: 'Number Input',
    description: 'Provides a static number as output',
    inputs: [],
    outputs: ['output'],
    configFields: [
      { key: 'value', label: 'Number', type: 'number', default: 0 }
    ],
  },
  {
    type: 'jsonInput',
    category: 'Input',
    label: 'JSON Input',
    description: 'Provides a static JSON object as output',
    inputs: [],
    outputs: ['output'],
    configFields: [
      { key: 'value', label: 'JSON', type: 'textarea', default: '{}' }
    ],
  },

  // ── TRANSFORM NODES ──────────────────────────────────────────────────────
  {
    type: 'uppercase',
    category: 'Transform',
    label: 'Uppercase',
    description: 'Converts input string to UPPERCASE',
    inputs: ['input'],
    outputs: ['output'],
    configFields: [],
  },
  {
    type: 'lowercase',
    category: 'Transform',
    label: 'Lowercase',
    description: 'Converts input string to lowercase',
    inputs: ['input'],
    outputs: ['output'],
    configFields: [],
  },
  {
    type: 'appendText',
    category: 'Transform',
    label: 'Append Text',
    description: 'Appends a suffix string to the input',
    inputs: ['input'],
    outputs: ['output'],
    configFields: [
      { key: 'suffix', label: 'Suffix to append', type: 'text', default: '' }
    ],
  },
  {
    type: 'replaceText',
    category: 'Transform',
    label: 'Replace Text',
    description: 'Replaces all occurrences of a string in the input',
    inputs: ['input'],
    outputs: ['output'],
    configFields: [
      { key: 'find',    label: 'Find',    type: 'text', default: '' },
      { key: 'replace', label: 'Replace', type: 'text', default: '' },
    ],
  },
  {
    type: 'parseJson',
    category: 'Transform',
    label: 'Parse JSON',
    description: 'Parses a JSON string into an object',
    inputs: ['input'],
    outputs: ['output'],
    configFields: [],
  },

  // ── CONDITION NODES ──────────────────────────────────────────────────────
  {
    type: 'condition',
    category: 'Condition',
    label: 'If / Else',
    description: 'Routes flow based on a condition. Has true and false output handles.',
    inputs: ['input'],
    outputs: ['true', 'false'],
    configFields: [
      {
        key: 'operator', label: 'Operator', type: 'select',
        options: ['truthy', 'falsy', '==', '!=', '>', '<', '>=', '<=', 'contains', 'startsWith'],
        default: 'truthy'
      },
      { key: 'value', label: 'Compare value', type: 'text', default: '' },
    ],
  },
  {
    type: 'compare',
    category: 'Condition',
    label: 'Compare Values',
    description: 'Compares two values. Same as If/Else.',
    inputs: ['input'],
    outputs: ['true', 'false'],
    configFields: [
      {
        key: 'operator', label: 'Operator', type: 'select',
        options: ['==', '!=', '>', '<', '>=', '<='],
        default: '=='
      },
      { key: 'value', label: 'Compare to', type: 'text', default: '' },
    ],
  },

  // ── OUTPUT NODES ─────────────────────────────────────────────────────────
  {
    type: 'displayOutput',
    category: 'Output',
    label: 'Display Output',
    description: 'Shows the final result. Pass-through.',
    inputs: ['input'],
    outputs: [],
    configFields: [],
  },
  {
    type: 'logOutput',
    category: 'Output',
    label: 'Log Output',
    description: 'Logs the value to the server console and passes it through.',
    inputs: ['input'],
    outputs: ['output'],
    configFields: [],
  },
];

module.exports = nodeRegistry;
