import useFlowStore from '../../store/useFlowStore';
import { getDefaultData } from '../../constants/nodeRegistry';

export default function PaletteItem({ node }) {
  const { addNode } = useFlowStore();

  const onDragStart = (e) => {
    e.dataTransfer.setData('application/flowboard-node', node.type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onClick = () => {
    // Add the node to a default center-ish position
    // You could make this more sophisticated by keeping track of offsets
    const position = {
      x: 350 + Math.random() * 50,
      y: 150 + Math.random() * 50,
    };
    addNode(node.type, position, getDefaultData(node.type));
  };

  const categoryColors = {
    Input: '#22D3EE',
    Transform: '#6366F1',
    Condition: '#F59E0B',
    Output: '#10B981',
  };

  return (
    <div
      className="palette-item"
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      title={node.description}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="palette-item-dot"
        style={{ backgroundColor: categoryColors[node.category] || '#6366F1' }}
      />
      <div className="palette-item-info">
        <span className="palette-item-label">{node.label}</span>
        <span className="palette-item-desc">{node.description}</span>
      </div>
    </div>
  );
}
