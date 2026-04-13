const nodeHandlers = require('./nodeHandlers');

async function run(nodes, edges) {
  if (!nodes || nodes.length === 0) return [];

  // ── Step 1: Build data structures ───────────────────────────────────────
  const nodeMap = {};
  const inDegree = {};
  const adjacency = {};

  nodes.forEach(node => {
    nodeMap[node.id] = node;
    inDegree[node.id] = 0;
    adjacency[node.id] = [];
  });

  edges.forEach(edge => {
    if (adjacency[edge.source]) {
      adjacency[edge.source].push(edge.target);
    }
    if (inDegree[edge.target] !== undefined) {
      inDegree[edge.target]++;
    }
  });

  // ── Step 2: Kahn's topological sort ────────────────────────────────────
  const queue = Object.keys(inDegree).filter(id => inDegree[id] === 0);
  const executionOrder = [];

  while (queue.length > 0) {
    const currentId = queue.shift();
    executionOrder.push(currentId);

    (adjacency[currentId] || []).forEach(nextId => {
      inDegree[nextId]--;
      if (inDegree[nextId] === 0) {
        queue.push(nextId);
      }
    });
  }

  // Cycle detection
  if (executionOrder.length !== nodes.length) {
    throw new Error('Workflow contains a cycle — cannot execute');
  }

  // ── Step 3: Execute nodes in order ─────────────────────────────────────
  const nodeOutputs = {};
  const skippedNodes = new Set();
  const results = [];

  for (const nodeId of executionOrder) {
    const node = nodeMap[nodeId];

    // Skip nodes on an inactive branch
    if (skippedNodes.has(nodeId)) {
      results.push({ nodeId, type: node.type, input: null, output: null, status: 'skipped' });
      // Cascade skip to downstream nodes
      (adjacency[nodeId] || []).forEach(nextId => skippedNodes.add(nextId));
      continue;
    }

    // Find incoming edge to get upstream data
    const incomingEdge = edges.find(e => e.target === nodeId);
    const input = incomingEdge ? nodeOutputs[incomingEdge.source] : null;

    // Get handler
    const handler = nodeHandlers[node.type];
    if (!handler) {
      results.push({
        nodeId, type: node.type, input, output: null,
        status: 'error', error: `Unknown node type: ${node.type}`
      });
      break;
    }

    // Execute
    try {
      const output = await handler(input, node.data || {});
      nodeOutputs[nodeId] = output;
      results.push({ nodeId, type: node.type, input, output, status: 'ok' });

      // ── Handle condition branching ────────────────────────────────────
      if (node.type === 'condition' || node.type === 'compare') {
        const activeHandle = output.result ? 'true' : 'false';
        const inactiveHandle = output.result ? 'false' : 'true';

        // Skip nodes on inactive branch
        edges
          .filter(e => e.source === nodeId && e.sourceHandle === inactiveHandle)
          .forEach(e => skippedNodes.add(e.target));

        // Pass the original value (not the wrapper object) downstream
        nodeOutputs[nodeId] = output.value;
      }

    } catch (err) {
      results.push({
        nodeId, type: node.type, input, output: null,
        status: 'error', error: err.message
      });
      // Stop on first error (v1 behaviour)
      break;
    }
  }

  return results;
}

module.exports = { run };
