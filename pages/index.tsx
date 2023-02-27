import { useCallback } from "react";
import { addEdge, Node, Edge, ReactFlow, updateEdge, useEdgesState, useNodesState, Connection } from "reactflow";
import 'reactflow/dist/style.css';

const initialNodes: Node<any, string | undefined>[] = []
const initialEdges: Edge<any>[] = [];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className="wrapper">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}