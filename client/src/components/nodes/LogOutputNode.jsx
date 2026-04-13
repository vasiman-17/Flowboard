import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import useFlowStore from '../../store/useFlowStore';

const LogOutputNode = ({ id, data }) => {
  const result = useFlowStore(s => s.executionResults[id]);

  return (
    <div className={`flow-node output-node ${result?.status === 'error' ? 'node-error' : ''}`}>
      <Handle type="target" position={Position.Left} id="input" />

      <div className="node-header">
        <span className="node-type-dot" style={{ background: '#10B981' }} />
        <span className="node-title">Log Output</span>
      </div>

      <div className="node-body">
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
          Logs to server console & passes through
        </span>
      </div>

      {result && (
        <div className={`node-result ${result.status}`}>
          {result.status === 'ok' && (
            <span className="result-value">
              {typeof result.output === 'object'
                ? JSON.stringify(result.output)
                : String(result.output ?? '')}
            </span>
          )}
          {result.status === 'error' && <span className="result-error">⚠ {result.error}</span>}
          {result.status === 'skipped' && <span className="result-skipped-label">Skipped</span>}
        </div>
      )}

      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

export default memo(LogOutputNode);
