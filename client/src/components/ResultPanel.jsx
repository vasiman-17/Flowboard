import useFlowStore from '../store/useFlowStore';

const statusIcon = { ok: '✓', error: '✗', skipped: '—' };
const statusColor = { ok: '#10B981', error: '#EF4444', skipped: '#94A3B8' };

export default function ResultPanel() {
  const executionResults = useFlowStore(s => s.executionResults);
  const nodes = useFlowStore(s => s.nodes);

  const hasResults = Object.keys(executionResults).length > 0;
  if (!hasResults) return null;

  const orderedResults = nodes
    .map(n => executionResults[n.id])
    .filter(Boolean);

  return (
    <div className="result-panel">
      <h3 className="result-panel-title">Execution Trace</h3>
      <div className="result-list">
        {orderedResults.map((r, i) => (
          <div
            key={r.nodeId}
            className={`result-item result-${r.status}`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span
              className="result-status-icon"
              style={{ color: statusColor[r.status] }}
            >
              {statusIcon[r.status]}
            </span>
            <div className="result-content">
              <span className="result-type">{r.type}</span>
              {r.status === 'ok' && (
                <>
                  <span className="result-arrow">→</span>
                  <span className="result-output">
                    {typeof r.output === 'object'
                      ? JSON.stringify(r.output)
                      : String(r.output ?? '')}
                  </span>
                </>
              )}
              {r.status === 'error' && (
                <span className="result-error-msg">{r.error}</span>
              )}
              {r.status === 'skipped' && (
                <span className="result-skipped-msg">skipped (inactive branch)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
