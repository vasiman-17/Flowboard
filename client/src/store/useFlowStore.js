import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';

const useFlowStore = create((set, get) => ({
  // ── Graph State ───────────────────────────────────────────────────────────
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (params) => {
    set({ edges: addEdge({ ...params, id: `e-${Date.now()}` }, get().edges) });
  },

  addNode: (type, position, defaultData = {}) => {
    const newNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      position,
      data: defaultData,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (nodeId, newData) => {
    set({
      nodes: get().nodes.map(n =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...newData } } : n
      ),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter(n => n.id !== nodeId),
      edges: get().edges.filter(e => e.source !== nodeId && e.target !== nodeId),
    });
  },

  clearCanvas: () => {
    set({
      nodes: [],
      edges: [],
      executionResults: {},
      currentWorkflowId: null,
      workflowName: 'Untitled Workflow',
    });
  },

  // ── Persistence ───────────────────────────────────────────────────────────
  currentWorkflowId: null,
  workflowName: 'Untitled Workflow',

  setWorkflowName: (name) => set({ workflowName: name }),

  setWorkflowMeta: (id, name) => set({ currentWorkflowId: id, workflowName: name }),

  loadWorkflow: ({ _id, name, nodes, edges }) => {
    set({
      currentWorkflowId: _id,
      workflowName: name,
      nodes: nodes || [],
      edges: edges || [],
      executionResults: {},
    });
  },

  // ── Execution State ───────────────────────────────────────────────────────
  isRunning: false,
  executionResults: {},

  setRunning: (value) => set({ isRunning: value }),

  setExecutionResults: (resultsArray) => {
    const map = {};
    resultsArray.forEach(r => { map[r.nodeId] = r; });
    set({ executionResults: map });
  },

  clearResults: () => set({ executionResults: {} }),
}));

export default useFlowStore;
