import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import useFlowStore from '../../store/useFlowStore';

const AppendTextNode = ({ id, data }) => {
  const updateNodeData = useFlowStore(s => s.updateNodeData);
  const result = useFlowStore(s => s.executionResults[id]);

  return (
    <div className={`flow-node transform-node ${result?.status === 'error' ? 'node-error' : ''}`}>
      <Handle type="target" position={Position.Left} id="input" />

      <div className="node-header">
        <span className="node-type-dot" style={{ background: '#6366F1' }} />
        <span className="node-title">Append Text</span>
      </div>

      <div className="node-body">
        <div className="node-field">
          <label className="node-label">Suffix to append</label>
          <input
            type="text"
            className="node-input"
            value={data.suffix || ''}
            onChange={e => updateNodeData(id, { suffix: e.target.value })}
            placeholder="Enter suffix..."
          />
        </div>
      </div>

      {result && (
        <div className={`node-result ${result.status}`}>
          {result.status === 'ok' && (
            <span className="result-value">{String(result.output)}</span>
          )}
          {result.status === 'error' && (
            <span className="result-error">⚠ {result.error}</span>
          )}
          {result.status === 'skipped' && (
            <span className="result-skipped-label">Skipped</span>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

export default memo(AppendTextNode);
