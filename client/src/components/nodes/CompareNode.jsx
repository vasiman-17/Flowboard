import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import useFlowStore from '../../store/useFlowStore';

const OPERATORS = ['==', '!=', '>', '<', '>=', '<='];

const CompareNode = ({ id, data }) => {
  const updateNodeData = useFlowStore(s => s.updateNodeData);
  const result = useFlowStore(s => s.executionResults[id]);

  return (
    <div className={`flow-node condition-node ${result?.status === 'error' ? 'node-error' : ''}`}
         style={{ position: 'relative' }}>
      <Handle type="target" position={Position.Left} id="input" />

      <div className="node-header">
        <span className="node-type-dot" style={{ background: '#F59E0B' }} />
        <span className="node-title">Compare Values</span>
      </div>

      <div className="node-body">
        <div className="node-field">
          <label className="node-label">Operator</label>
          <select
            value={data.operator || '=='}
            onChange={e => updateNodeData(id, { operator: e.target.value })}
            className="node-select"
          >
            {OPERATORS.map(op => <option key={op} value={op}>{op}</option>)}
          </select>
        </div>
        <div className="node-field">
          <label className="node-label">Compare to</label>
          <input
            type="text"
            value={data.value || ''}
            onChange={e => updateNodeData(id, { value: e.target.value })}
            placeholder="Value..."
            className="node-input"
          />
        </div>
      </div>

      {result && (
        <div className={`node-result ${result.status}`}>
          {result.status === 'ok' && (
            <span style={{ fontSize: '12px', fontWeight: 600 }}>
              Branch: <span style={{ color: result.output?.result ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                {result.output?.result ? 'TRUE ✓' : 'FALSE ✗'}
              </span>
            </span>
          )}
          {result.status === 'error' && <span className="result-error">⚠ {result.error}</span>}
        </div>
      )}

      <span className="branch-label true-label">true</span>
      <span className="branch-label false-label">false</span>

      <Handle type="source" position={Position.Right} id="true"
        className="handle-true" style={{ top: '35%' }} />
      <Handle type="source" position={Position.Right} id="false"
        className="handle-false" style={{ top: '65%' }} />
    </div>
  );
};

export default memo(CompareNode);
