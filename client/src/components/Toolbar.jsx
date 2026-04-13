import useFlowStore from '../store/useFlowStore';
import { api } from '../api/workflows';

export default function Toolbar({ onOpenWorkflows }) {
  const {
    nodes, edges, workflowName, currentWorkflowId,
    setWorkflowName, setWorkflowMeta,
    isRunning, setRunning, setExecutionResults,
    clearCanvas, clearResults,
  } = useFlowStore();

  const handleSave = async () => {
    const payload = { name: workflowName, nodes, edges };
    try {
      if (currentWorkflowId) {
        await api.update(currentWorkflowId, payload);
        showToast('Workflow saved!', 'success');
      } else {
        const res = await api.create(payload);
        setWorkflowMeta(res.data._id, res.data.name);
        showToast('Workflow created!', 'success');
      }
    } catch (err) {
      showToast('Save failed: ' + (err.response?.data?.error || err.message), 'error');
    }
  };

  const handleRun = async () => {
    if (!currentWorkflowId) {
      showToast('Save the workflow first before running.', 'info');
      return;
    }
    if (nodes.length === 0) {
      showToast('Add some nodes first.', 'info');
      return;
    }
    setRunning(true);
    clearResults();
    try {
      await api.update(currentWorkflowId, { name: workflowName, nodes, edges });
      const res = await api.execute(currentWorkflowId);
      setExecutionResults(res.data.results);
      showToast('Execution complete!', 'success');
    } catch (err) {
      showToast('Execution failed: ' + (err.response?.data?.error || err.message), 'error');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-brand">
        <div className="toolbar-brand-icon">⬡</div>
        Flowboard
      </div>

      <input
        type="text"
        value={workflowName}
        onChange={e => setWorkflowName(e.target.value)}
        className="workflow-name-input"
        id="workflow-name"
        placeholder="Workflow name..."
      />

      <div className="toolbar-actions">
        <button onClick={onOpenWorkflows} className="btn btn-ghost" id="btn-load">
          📂 Load
        </button>
        <button onClick={clearCanvas} className="btn btn-ghost" id="btn-clear">
          🗑 Clear
        </button>
        <button onClick={handleSave} className="btn btn-secondary" id="btn-save">
          💾 Save
        </button>
        <button onClick={handleRun} disabled={isRunning} className="btn btn-primary" id="btn-run">
          {isRunning ? (
            <><span className="loading-spinner" /> Running...</>
          ) : (
            '▶ Run'
          )}
        </button>
      </div>

      {/* Toast container */}
      <div id="toast-container" className="toast-container" />
    </div>
  );
}

// Simple toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 300ms ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
