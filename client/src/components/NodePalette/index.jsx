import { useState, useEffect } from 'react';
import PaletteItem from './PaletteItem';
import { api } from '../../api/workflows';

const CATEGORIES = ['All', 'Input', 'Transform', 'Condition', 'Output'];

// Fallback registry in case the server is not available
const FALLBACK_REGISTRY = [
  { type: 'textInput', category: 'Input', label: 'Text Input', description: 'Provides a static text string as output' },
  { type: 'numberInput', category: 'Input', label: 'Number Input', description: 'Provides a static number as output' },
  { type: 'jsonInput', category: 'Input', label: 'JSON Input', description: 'Provides a static JSON object as output' },
  { type: 'uppercase', category: 'Transform', label: 'Uppercase', description: 'Converts input string to UPPERCASE' },
  { type: 'lowercase', category: 'Transform', label: 'Lowercase', description: 'Converts input string to lowercase' },
  { type: 'appendText', category: 'Transform', label: 'Append Text', description: 'Appends a suffix string to the input' },
  { type: 'replaceText', category: 'Transform', label: 'Replace Text', description: 'Replaces all occurrences of a string' },
  { type: 'parseJson', category: 'Transform', label: 'Parse JSON', description: 'Parses a JSON string into an object' },
  { type: 'condition', category: 'Condition', label: 'If / Else', description: 'Routes flow based on a condition' },
  { type: 'compare', category: 'Condition', label: 'Compare Values', description: 'Compares two values' },
  { type: 'displayOutput', category: 'Output', label: 'Display Output', description: 'Shows the final result' },
  { type: 'logOutput', category: 'Output', label: 'Log Output', description: 'Logs value to server console' },
];

export default function NodePalette() {
  const [nodeRegistry, setNodeRegistry] = useState(FALLBACK_REGISTRY);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.getNodeTypes()
      .then(res => setNodeRegistry(res.data))
      .catch(() => setNodeRegistry(FALLBACK_REGISTRY));
  }, []);

  const filtered = nodeRegistry.filter(node => {
    const q = search.toLowerCase();
    const matchesSearch = !q ||
      node.label.toLowerCase().includes(q) ||
      node.description.toLowerCase().includes(q) ||
      node.category.toLowerCase().includes(q);
    const matchesCategory = activeCategory === 'All' || node.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const grouped = CATEGORIES.filter(c => c !== 'All').reduce((acc, cat) => {
    acc[cat] = filtered.filter(n => n.category === cat);
    return acc;
  }, {});

  return (
    <aside className="node-palette">
      <div className="palette-header">
        <h2>Nodes</h2>
        <input
          type="text"
          placeholder="Search nodes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="palette-search"
          id="node-search"
        />
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'tab active' : 'tab'}
              id={`tab-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="palette-list">
        {activeCategory === 'All'
          ? Object.entries(grouped).map(([cat, nodes]) =>
              nodes.length > 0 && (
                <div key={cat} className="palette-group">
                  <div className="palette-group-label">{cat}</div>
                  {nodes.map(node => <PaletteItem key={node.type} node={node} />)}
                </div>
              )
            )
          : filtered.map(node => <PaletteItem key={node.type} node={node} />)
        }
        {filtered.length === 0 && (
          <div className="palette-empty">No nodes found</div>
        )}
      </div>
    </aside>
  );
}
