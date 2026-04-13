import TextInputNode    from '../components/nodes/TextInputNode';
import NumberInputNode  from '../components/nodes/NumberInputNode';
import JsonInputNode    from '../components/nodes/JsonInputNode';
import UppercaseNode    from '../components/nodes/UppercaseNode';
import LowercaseNode    from '../components/nodes/LowercaseNode';
import AppendTextNode   from '../components/nodes/AppendTextNode';
import ReplaceTextNode  from '../components/nodes/ReplaceTextNode';
import ParseJsonNode    from '../components/nodes/ParseJsonNode';
import ConditionNode    from '../components/nodes/ConditionNode';
import CompareNode      from '../components/nodes/CompareNode';
import DisplayOutputNode from '../components/nodes/DisplayOutputNode';
import LogOutputNode    from '../components/nodes/LogOutputNode';

export const nodeTypes = {
  textInput:     TextInputNode,
  numberInput:   NumberInputNode,
  jsonInput:     JsonInputNode,
  uppercase:     UppercaseNode,
  lowercase:     LowercaseNode,
  appendText:    AppendTextNode,
  replaceText:   ReplaceTextNode,
  parseJson:     ParseJsonNode,
  condition:     ConditionNode,
  compare:       CompareNode,
  displayOutput: DisplayOutputNode,
  logOutput:     LogOutputNode,
};
