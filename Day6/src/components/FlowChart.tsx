import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowData } from '../services/gemini';

interface FlowChartProps {
  flowData: FlowData | null;
  onReset: () => void;
  onExport: (element: HTMLElement) => void;
}

const FlowChart: React.FC<FlowChartProps> = ({ flowData, onReset, onExport }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const flowRef = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleExport = useCallback(() => {
    if (flowRef.current) {
      onExport(flowRef.current);
    }
  }, [onExport]);

  // Convert flow data to React Flow format
  React.useEffect(() => {
    if (flowData) {
      const reactFlowNodes: Node[] = flowData.nodes.map((node, index) => ({
        id: node.id,
        type: 'default',
        position: { 
          x: (index % 4) * 250 + 100, 
          y: Math.floor(index / 4) * 120 + 50 
        },
        data: { label: node.label },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: {
          background: '#ffffff',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#1f2937',
          minWidth: '140px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      }));

      const reactFlowEdges: Edge[] = flowData.edges.map((edge, index) => ({
        id: `e-${edge.from}-${edge.to}-${index}`,
        source: edge.from,
        target: edge.to,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
        style: {
          stroke: '#3b82f6',
          strokeWidth: 2,
        },
      }));

      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);
    }
  }, [flowData, setNodes, setEdges]);

  if (!flowData) {
    return null;
  }

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h2 className="text-lg font-semibold text-gray-800">Interactive Flowchart</h2>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Export PNG
          </button>
        </div>
      </div>
      
      <div ref={flowRef} className="w-full bg-gray-50" style={{ height: 'calc(100vh - 280px)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          attributionPosition="bottom-left"
          style={{ width: '100%', height: '100%' }}
        >
          <Background color="#e5e7eb" gap={20} />
          <Controls />
          <MiniMap 
            nodeColor="#3b82f6"
            nodeStrokeWidth={2}
            zoomable
            pannable
            style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowChart;
