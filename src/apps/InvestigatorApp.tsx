import React, { useState, useRef } from 'react';
import { EvidenceNode, EvidenceEdge, UserHypothesis, InvestigatorNote, RelationType, EvidenceNodeType } from '../types/investigation';
import { Clue } from '../types/clues';
import { 
  Network, FileText, CheckCircle2, Plus, Trash2, 
  Layers, Lightbulb, Link2, Pin, Shield, AlertCircle 
} from 'lucide-react';

interface InvestigatorAppProps {
  nodes: EvidenceNode[];
  edges: EvidenceEdge[];
  hypotheses: UserHypothesis[];
  notes: InvestigatorNote[];
  clues: Clue[];
  onUpdateNodes?: (nodes: EvidenceNode[]) => void;
  onUpdateEdges?: (edges: EvidenceEdge[]) => void;
  onAddHypothesis?: (hypo: UserHypothesis) => void;
  onAddNote?: (note: InvestigatorNote) => void;
}

export const InvestigatorApp: React.FC<InvestigatorAppProps> = ({
  nodes,
  edges,
  hypotheses,
  notes,
  clues,
  onUpdateNodes,
  onUpdateEdges,
  onAddHypothesis,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'hypotheses' | 'clues'>('board');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Modals for adding nodes/connections
  const [showAddNodeModal, setShowAddNodeModal] = useState<boolean>(false);
  const [showAddEdgeModal, setShowAddEdgeModal] = useState<boolean>(false);
  const [newNodeLabel, setNewNodeLabel] = useState<string>('');
  const [newNodeType, setNewNodeType] = useState<EvidenceNodeType>('document');
  const [newNodeSummary, setNewNodeSummary] = useState<string>('');
  const [edgeTargetId, setEdgeTargetId] = useState<string>('');
  const [edgeRelation, setEdgeRelation] = useState<RelationType>('mentions');

  // Hypothesis state
  const [newHypoTitle, setNewHypoTitle] = useState<string>('');
  const [newHypoDesc, setNewHypoDesc] = useState<string>('');

  const boardRef = useRef<HTMLDivElement>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Dragging mechanics
  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setDraggedNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDragOffset({
        x: e.clientX - node.x,
        y: e.clientY - node.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNodeId) {
      const updated = nodes.map(n => {
        if (n.id === draggedNodeId) {
          return {
            ...n,
            x: Math.max(10, Math.min(1200, e.clientX - dragOffset.x)),
            y: Math.max(10, Math.min(800, e.clientY - dragOffset.y)),
          };
        }
        return n;
      });
      if (onUpdateNodes) onUpdateNodes(updated);
    }
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
  };

  const handleCreateNode = () => {
    if (!newNodeLabel) return;
    const newNode: EvidenceNode = {
      id: `node_user_${Date.now()}`,
      label: newNodeLabel,
      type: newNodeType,
      summary: newNodeSummary || 'Custom investigator evidence node.',
      x: 300 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      confidence: 80,
      isPinned: false,
      isUserCreated: true,
    };
    if (onUpdateNodes) {
      onUpdateNodes([...nodes, newNode]);
    }
    setShowAddNodeModal(false);
    setNewNodeLabel('');
    setNewNodeSummary('');
  };

  const handleCreateEdge = () => {
    if (!selectedNodeId || !edgeTargetId) return;
    const newEdge: EvidenceEdge = {
      id: `edge_${Date.now()}`,
      source: selectedNodeId,
      target: edgeTargetId,
      relation: edgeRelation,
      label: edgeRelation.toUpperCase().replace('_', ' '),
      confidence: 85,
      isUserCreated: true,
      discovered: true,
    };
    if (onUpdateEdges) {
      onUpdateEdges([...edges, newEdge]);
    }
    setShowAddEdgeModal(false);
  };

  const handleCreateHypothesis = () => {
    if (!newHypoTitle) return;
    const hypo: UserHypothesis = {
      id: `hypo_${Date.now()}`,
      title: newHypoTitle,
      description: newHypoDesc,
      supportingNodeIds: selectedNodeId ? [selectedNodeId] : [],
      contradictingNodeIds: [],
      confidence: 75,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    if (onAddHypothesis) onAddHypothesis(hypo);
    setNewHypoTitle('');
    setNewHypoDesc('');
  };

  const getNodeColor = (type: EvidenceNodeType) => {
    switch (type) {
      case 'person': return '#3b82f6';
      case 'event': return '#f59e0b';
      case 'document': return '#10b981';
      case 'anomaly': return '#ef4444';
      case 'organization': return '#8b5cf6';
      case 'location': return '#06b6d4';
      default: return '#64748b';
    }
  };

  const getRelationColor = (rel: RelationType) => {
    switch (rel) {
      case 'contradicts': return '#ef4444';
      case 'created_by': return '#10b981';
      case 'mentions': return '#3b82f6';
      case 'coverup': return '#a855f7';
      default: return '#eab308';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-main)' }}>
      {/* Top Mode Bar */}
      <div className="app-toolbar" style={{ borderBottom: '1px solid var(--window-border-dark)', gap: '8px' }}>
        <button 
          className="bevel-button" 
          onClick={() => setActiveTab('board')}
          style={{ fontWeight: activeTab === 'board' ? 'bold' : 'normal', background: activeTab === 'board' ? 'var(--selection-bg)' : undefined, color: activeTab === 'board' ? 'var(--selection-text)' : undefined }}
        >
          <Network size={14} /> Evidence Corkboard
        </button>
        <button 
          className="bevel-button" 
          onClick={() => setActiveTab('hypotheses')}
          style={{ fontWeight: activeTab === 'hypotheses' ? 'bold' : 'normal', background: activeTab === 'hypotheses' ? 'var(--selection-bg)' : undefined, color: activeTab === 'hypotheses' ? 'var(--selection-text)' : undefined }}
        >
          <Lightbulb size={14} /> Hypotheses & Notes ({hypotheses.length})
        </button>
        <button 
          className="bevel-button" 
          onClick={() => setActiveTab('clues')}
          style={{ fontWeight: activeTab === 'clues' ? 'bold' : 'normal', background: activeTab === 'clues' ? 'var(--selection-bg)' : undefined, color: activeTab === 'clues' ? 'var(--selection-text)' : undefined }}
        >
          <Shield size={14} /> Clue Provenance Matrix ({clues.filter(c => c.discovered).length}/{clues.length})
        </button>

        <div style={{ flex: 1 }} />

        {activeTab === 'board' && (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className="bevel-button" onClick={() => setShowAddNodeModal(true)}>
              <Plus size={13} /> Add Node
            </button>
            <button className="bevel-button" onClick={() => setShowAddEdgeModal(true)} disabled={!selectedNodeId}>
              <Link2 size={13} /> Connect Node
            </button>
          </div>
        )}
      </div>

      {/* Main View Area */}
      {activeTab === 'board' && (
        <div 
          ref={boardRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ 
            flex: 1, 
            position: 'relative', 
            overflow: 'hidden', 
            background: '#1a1612', 
            backgroundImage: 'radial-gradient(#2d241c 15%, transparent 16%)',
            backgroundSize: '32px 32px',
            cursor: draggedNodeId ? 'grabbing' : 'default',
          }}
        >
          {/* SVG Connecting String Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {edges.map(edge => {
              const srcNode = nodes.find(n => n.id === edge.source);
              const tgtNode = nodes.find(n => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const stroke = getRelationColor(edge.relation);
              const midX = (srcNode.x + tgtNode.x) / 2 + 50;
              const midY = (srcNode.y + tgtNode.y) / 2 + 25;

              return (
                <g key={edge.id}>
                  <line
                    x1={srcNode.x + 60}
                    y1={srcNode.y + 30}
                    x2={tgtNode.x + 60}
                    y2={tgtNode.y + 30}
                    stroke={stroke}
                    strokeWidth={edge.relation === 'contradicts' ? 3 : 2}
                    strokeDasharray={edge.relation === 'contradicts' ? '4 3' : undefined}
                    opacity={0.8}
                  />
                  <text
                    x={midX}
                    y={midY}
                    fill={stroke}
                    fontSize="10"
                    fontFamily="var(--mono-font)"
                    fontWeight="bold"
                    textAnchor="middle"
                    style={{ background: '#000', filter: 'drop-shadow(1px 1px 1px #000)' }}
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Draggable Node Cards */}
          {nodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            const color = getNodeColor(node.type);

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                className="bevel-box"
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: '160px',
                  padding: '8px 10px',
                  background: isSelected ? 'var(--selection-bg)' : '#fdfbf7',
                  color: isSelected ? 'var(--selection-text)' : '#1a1a1a',
                  boxShadow: isSelected ? '0 0 14px rgba(234, 179, 8, 0.8), 2px 4px 8px rgba(0,0,0,0.6)' : '2px 4px 8px rgba(0,0,0,0.6)',
                  cursor: 'grab',
                  zIndex: isSelected ? 50 : 20,
                  borderTop: `4px solid ${color}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', color: isSelected ? '#fff' : color }}>
                    {node.type}
                  </span>
                  {node.isPinned && <Pin size={10} style={{ color: '#ef4444' }} />}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {node.label}
                </div>
                <div style={{ fontSize: '10px', opacity: 0.8, lineHeight: 1.3, maxHeight: '38px', overflow: 'hidden' }}>
                  {node.summary}
                </div>
              </div>
            );
          })}

          {/* Inspector Panel Floating at Bottom Right */}
          {selectedNode && (
            <div 
              className="bevel-box"
              style={{
                position: 'absolute',
                right: '16px',
                bottom: '16px',
                width: '320px',
                background: 'var(--window-bg)',
                padding: '12px',
                zIndex: 100,
                boxShadow: '4px 4px 16px rgba(0,0,0,0.7)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{selectedNode.label}</span>
                <button className="window-control-btn bevel-button" onClick={() => setSelectedNodeId(null)}>✕</button>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Type: <strong>{selectedNode.type}</strong> | Confidence: <strong>{selectedNode.confidence}%</strong>
              </div>
              <div style={{ fontSize: '12px', lineHeight: 1.4, marginBottom: '12px' }}>
                {selectedNode.summary}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="bevel-button" onClick={() => setShowAddEdgeModal(true)}>
                  <Link2 size={12} /> Connect
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hypotheses Tab */}
      {activeTab === 'hypotheses' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'var(--card-bg)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
              Investigator Hypotheses & Working Theories
            </h3>
            
            {/* Hypotheses Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {hypotheses.map(hypo => (
                <div key={hypo.id} className="bevel-box" style={{ padding: '14px', background: 'var(--window-bg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{hypo.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Certainty: {hypo.confidence}%</span>
                  </div>
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-main)', marginBottom: '10px' }}>
                    {hypo.description}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Created: {hypo.createdAt}
                  </div>
                </div>
              ))}
            </div>

            {/* Create Hypothesis Form */}
            <div className="bevel-box" style={{ padding: '16px', background: 'var(--window-bg)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Record New Hypothesis</h4>
              <input
                type="text"
                placeholder="Theory title..."
                value={newHypoTitle}
                onChange={(e) => setNewHypoTitle(e.target.value)}
                style={{ width: '100%', padding: '6px', fontSize: '12px', marginBottom: '8px' }}
                className="bevel-sunken"
              />
              <textarea
                rows={4}
                placeholder="Elaborate your working theory and rationale based on discovered evidence..."
                value={newHypoDesc}
                onChange={(e) => setNewHypoDesc(e.target.value)}
                style={{ width: '100%', padding: '6px', fontSize: '12px', marginBottom: '8px' }}
                className="bevel-sunken"
              />
              <button className="bevel-button" onClick={handleCreateHypothesis} style={{ fontWeight: 'bold' }}>
                Save Hypothesis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clue Provenance Matrix Tab */}
      {activeTab === 'clues' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'var(--card-bg)' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
              The Clue Provenance Engine Matrix
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Every discovery inside SOMNIA is registered with its origin artifact, conditions, and narrative arc.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {clues.map(clue => (
                <div 
                  key={clue.id}
                  className="bevel-box"
                  style={{ 
                    padding: '12px', 
                    background: clue.discovered ? 'var(--window-bg)' : 'rgba(0, 0, 0, 0.05)',
                    opacity: clue.discovered ? 1 : 0.5 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} style={{ color: clue.discovered ? '#16a34a' : '#94a3b8' }} />
                      <span style={{ fontWeight: 'bold', fontSize: '13px' }}>
                        [{clue.code}] {clue.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Arc {clue.arc} • {clue.category.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', marginBottom: '6px', lineHeight: 1.4 }}>
                    {clue.discovered ? clue.description : '??? [LOCKED - DISCOVERY CONDITIONS UNMET]'}
                  </div>

                  {clue.discovered && (
                    <div style={{ fontSize: '11px', color: '#15803d', fontFamily: 'var(--mono-font)' }}>
                      PROVENANCE: {clue.provenance}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Node Modal */}
      {showAddNodeModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="bevel-box" style={{ width: '380px', padding: '16px', background: 'var(--window-bg)' }}>
            <h4 style={{ marginBottom: '10px' }}>Add Evidence Node</h4>
            <input
              type="text"
              placeholder="Node Name (e.g. Dr. Kovacs, Station Epsilon)..."
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
              style={{ width: '100%', padding: '6px', marginBottom: '8px' }}
              className="bevel-sunken"
            />
            <select
              value={newNodeType}
              onChange={(e) => setNewNodeType(e.target.value as any)}
              style={{ width: '100%', padding: '6px', marginBottom: '8px' }}
              className="bevel-sunken"
            >
              <option value="person">Person</option>
              <option value="event">Event</option>
              <option value="document">Document</option>
              <option value="anomaly">Anomaly</option>
              <option value="organization">Organization</option>
              <option value="location">Location</option>
            </select>
            <textarea
              rows={3}
              placeholder="Summary notes..."
              value={newNodeSummary}
              onChange={(e) => setNewNodeSummary(e.target.value)}
              style={{ width: '100%', padding: '6px', marginBottom: '12px' }}
              className="bevel-sunken"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="bevel-button" onClick={() => setShowAddNodeModal(false)}>Cancel</button>
              <button className="bevel-button" onClick={handleCreateNode} style={{ fontWeight: 'bold' }}>Add to Board</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Connection Modal */}
      {showAddEdgeModal && selectedNode && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="bevel-box" style={{ width: '380px', padding: '16px', background: 'var(--window-bg)' }}>
            <h4 style={{ marginBottom: '10px' }}>Connect: {selectedNode.label}</h4>
            <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Connect To:</label>
            <select
              value={edgeTargetId}
              onChange={(e) => setEdgeTargetId(e.target.value)}
              style={{ width: '100%', padding: '6px', marginBottom: '8px' }}
              className="bevel-sunken"
            >
              <option value="">Select target node...</option>
              {nodes.filter(n => n.id !== selectedNode.id).map(n => (
                <option key={n.id} value={n.id}>{n.label} ({n.type})</option>
              ))}
            </select>

            <label style={{ fontSize: '11px', fontWeight: 'bold' }}>Relationship Type:</label>
            <select
              value={edgeRelation}
              onChange={(e) => setEdgeRelation(e.target.value as any)}
              style={{ width: '100%', padding: '6px', marginBottom: '12px' }}
              className="bevel-sunken"
            >
              <option value="mentions">Mentions</option>
              <option value="contradicts">Contradicts (Conflict!)</option>
              <option value="created_by">Created By</option>
              <option value="witnessed">Witnessed</option>
              <option value="coverup">Coverup / Silenced</option>
              <option value="communicated_with">Communicated With</option>
            </select>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="bevel-button" onClick={() => setShowAddEdgeModal(false)}>Cancel</button>
              <button className="bevel-button" onClick={handleCreateEdge} style={{ fontWeight: 'bold' }}>Link Nodes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
