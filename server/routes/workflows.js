const express = require('express');
const router = express.Router();
const controller = require('../controllers/workflowController');
const { verifyToken } = require('../middleware/auth');

// CRUD routes (all protected)
router.get('/workflows', verifyToken, controller.getAll);
router.post('/workflows', verifyToken, controller.create);
router.get('/workflows/:id', verifyToken, controller.getOne);
router.put('/workflows/:id', verifyToken, controller.update);
router.delete('/workflows/:id', verifyToken, controller.remove);

// Execution (protected)
router.post('/workflows/:id/execute', verifyToken, controller.execute);

// Node types registry (public - no auth required)
router.get('/node-types', controller.getNodeTypes);

module.exports = router;
