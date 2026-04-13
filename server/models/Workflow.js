const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  id:       { type: String, required: true },
  type:     { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  data:     { type: mongoose.Schema.Types.Mixed, default: {} },
}, { _id: false });

const EdgeSchema = new mongoose.Schema({
  id:           { type: String, required: true },
  source:       { type: String, required: true },
  target:       { type: String, required: true },
  sourceHandle: { type: String, default: null },
  targetHandle: { type: String, default: null },
}, { _id: false });

const WorkflowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name:        { type: String, required: true, default: 'Untitled Workflow' },
  description: { type: String, default: '' },
  nodes:       [NodeSchema],
  edges:       [EdgeSchema],
}, { timestamps: true });

// Index for sorted list queries
WorkflowSchema.index({ updatedAt: -1 });

module.exports = mongoose.model('Workflow', WorkflowSchema);
