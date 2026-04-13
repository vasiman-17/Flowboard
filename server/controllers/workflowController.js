const Workflow = require('../models/Workflow');
const executor = require('../engine/executor');
const nodeRegistry = require('../registry/nodeRegistry');

// Helper: Check if user owns workflow
const checkOwnership = async (workflowId, userId) => {
  const workflow = await Workflow.findById(workflowId);
  if (!workflow) {
    return { exists: false, owned: false };
  }
  return { exists: true, owned: workflow.userId.toString() === userId.toString() };
};

exports.getAll = async (req, res) => {
  try {
    // Filter workflows by current user
    const workflows = await Workflow.find({ userId: req.user.userId }, 'name updatedAt createdAt').sort({ updatedAt: -1 });
    res.json(workflows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { exists, owned } = await checkOwnership(req.params.id, req.user.userId);
    if (!exists) return res.status(404).json({ error: 'Not found' });
    if (!owned) return res.status(403).json({ error: 'Forbidden' });

    const workflow = await Workflow.findById(req.params.id);
    res.json(workflow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, nodes, edges } = req.body;
    // Auto-assign userId from authenticated user
    const workflow = await Workflow.create({
      userId: req.user.userId,
      name,
      description,
      nodes,
      edges,
    });
    res.status(201).json(workflow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { exists, owned } = await checkOwnership(req.params.id, req.user.userId);
    if (!exists) return res.status(404).json({ error: 'Not found' });
    if (!owned) return res.status(403).json({ error: 'Forbidden' });

    const { name, description, nodes, edges } = req.body;
    const workflow = await Workflow.findByIdAndUpdate(
      req.params.id,
      { name, description, nodes, edges },
      { new: true, runValidators: true }
    );
    res.json(workflow);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { exists, owned } = await checkOwnership(req.params.id, req.user.userId);
    if (!exists) return res.status(404).json({ error: 'Not found' });
    if (!owned) return res.status(403).json({ error: 'Forbidden' });

    await Workflow.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.execute = async (req, res) => {
  try {
    const { exists, owned } = await checkOwnership(req.params.id, req.user.userId);
    if (!exists) return res.status(404).json({ error: 'Not found' });
    if (!owned) return res.status(403).json({ error: 'Forbidden' });

    const workflow = await Workflow.findById(req.params.id);
    if (workflow.nodes.length === 0) return res.status(400).json({ error: 'Workflow has no nodes' });
    if (workflow.nodes.length > 50) return res.status(400).json({ error: 'Max 50 nodes per workflow' });

    const results = await executor.run(workflow.nodes, workflow.edges);
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNodeTypes = (req, res) => {
  res.json(nodeRegistry);
};
