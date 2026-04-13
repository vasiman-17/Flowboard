import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import useFlowStore from '../../store/useFlowStore';

const DisplayOutputNode = ({ id, data }) => {
  const result = useFlowStore(s => s.executionResults[id]);

  return (
    <div className={`flow-node output-node ${result?.status === 'error' ? 'node-error' : ''}`}>
      <Handle type="target" position={Position.Left} id="input" />

      <div className="node-header">
        <span className="node-type-dot" style={{ background: '#10B981' }} />
        <span className="node-title">Display Output</span>
      </div>

      <div className="node-body">
        {!result && (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Run the workflow to see output
          </span>
        )}
      </div>

      {result && (
        <div className={`node-result ${result.status}`}>
          {result.status === 'ok' && (
            <span className="result-value" style={{ fontSize: '13px', fontWeight: 500 }}>
              {typeof result.output === 'object'
                ? JSON.stringify(result.output, null, 2)
                : String(result.output ?? '')}
            </span>
          )}
          {result.status === 'error' && <span className="result-error">⚠ {result.error}</span>}
          {result.status === 'skipped' && <span className="result-skipped-label">Skipped</span>}
        </div>
      )}
    </div>
  );
};

export default memo(DisplayOutputNode);
