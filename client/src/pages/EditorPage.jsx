import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import Canvas from '../components/Canvas';
import Toolbar from '../components/Toolbar';
import NodePalette from '../components/NodePalette';
import ResultPanel from '../components/ResultPanel';
import { api } from '../api/workflows';
import useFlowStore from '../store/useFlowStore';

const EditorPage = () => {
  const { workflowId } = useParams();
  const navigate = useNavigate();
  const { loadWorkflow } = useFlowStore();

  useEffect(() => {
    if (workflowId) {
      const fetchWorkflow = async () => {
        try {
          const response = await api.get(workflowId);
          loadWorkflow(response.data);
        } catch (err) {
          console.error('Failed to load workflow:', err);
          navigate('/dashboard');
        }
      };
      fetchWorkflow();
    }
  }, [workflowId, loadWorkflow, navigate]);

  return (
    <ReactFlowProvider>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--bg-primary)',
      }}>
        <Toolbar />
        <div style={{ display: 'flex', flex: 1, gap: 0 }}>
          <NodePalette />
          <Canvas />
          <ResultPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default EditorPage;
