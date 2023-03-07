import { DragEvent, useCallback, useRef, useState } from "react";
import { addEdge, Node, Edge, ReactFlow, updateEdge, useEdgesState, useNodesState, Connection, ReactFlowProvider } from "reactflow";
import 'reactflow/dist/style.css';
import { StartNode } from 'components/startNode.js';
import { BooleanNode }  from "components/booleanNode.js";
import { SideBar } from "@/components/SideBar";

const initialNodes: Node<any, string | undefined>[] = []
const initialEdges: Edge<any>[] = [];

const nodeTypes = { startNode: StartNode, booleanQuestion: BooleanNode };

let id = 0;
let json = {
  "questions": [],
}

interface Question {
  id: string;
  type: string;
  label: string;
  goto?: string;
}

export default function Home() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback((params: Edge<any> | Connection) =>  {
    console.log(params);
    const index = json.questions.findIndex((question: Question) => question.id === params.source);
    const item = json.questions.find((question: Question) => question.id === params.source);
    
    if(!item) return;
    
    switch(item.type) {
      case 'startNode': 
        item.goto = params.target;
        json.questions[index] = item;
        break;
      case 'booleanQuestion':
        if(!item.options) {
          item.options = [];
        }

        if(params.sourceHandle === "a") {
          item.options.push({
            "label": "Yes",
            "goto": params.target
          });
        } else if (params.sourceHandle === "b") {
          item.options.push({
            "label": "No",
            "goto": params.target
          });
        }
        break;
      default:
        console.log("default")
        break;
    }

    console.log(json);
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      json.questions.push({
        id: `${id}`,
        type: type,
        label: `${type} node`,
      })
      
      const newNode = {
        id: `${id}`,
        type,
        position,
        data: { 
          label: `${type} node`,
          id: `${id}`,
          type: type
      },
      };

      id++;
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <div style={{
          width: '100%',
          height: '100%',
        }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
        />
        </div>
        <SideBar />
      </ReactFlowProvider>
    </div>
  );
}

