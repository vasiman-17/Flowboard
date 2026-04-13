import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import useFlowStore from '../../store/useFlowStore';

const JsonInputNode = ({ id, data }) => {
  const updateNodeData = useFlowStore(s => s.updateNodeData);
  const result = useFlowStore(s => s.executionResults[id]);

  return (
    <div className={`flow-node input-node ${result?.status === 'error' ? 'node-error' : ''}`}>
      <div className="node-header">
        <span className="node-type-dot" style={{ background: '#22D3EE' }} />
        <span className="node-title">JSON Input</span>
      </div>

      <div className="node-body">
        <textarea
          className="node-textarea"
          value={data.value || '{}'}
          onChange={e => updateNodeData(id, { value: e.target.value })}
          placeholder='{"key": "value"}'
          rows={4}
          style={{ fontFamily: 'var(--font-mono)' }}
        />
      </div>

      {result && (
        <div className={`node-result ${result.status}`}>
          {result.status === 'ok' && (
            <span className="result-value">
              {typeof result.output === 'object' ? JSON.stringify(result.output) : String(result.output)}
            </span>
          )}
          {result.status === 'error' && (
            <span className="result-error">⚠ {result.error}</span>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

export default memo(JsonInputNode);
