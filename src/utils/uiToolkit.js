// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import {useState, useRef, useCallback} from "react";
import ReactFlow, {Controls, Background, MiniMap} from "reactflow";
import {useStore} from "../state/store";
import {InputNode} from "../components/nodes/inputNode";
import {LLMNode} from "../components/nodes/llmNode";
import {OutputNode} from "../components/nodes/outputNode";
import {TextNode} from "../components/nodes/textNode";
import {FilterNode} from "../components/nodes/FilterNode";
import {TemplateNode} from "../components/nodes/TemplateNode";
import {ValidationNode} from "../components/nodes/ValidationNode";
import {TransformNode} from "../components/nodes/TransformNode";
import {MergeNode} from "../components/nodes/MergeNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = {hideAttribution: true};
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  template: TemplateNode,
  validation: ValidationNode,
  transform: TransformNode,
  merge: MergeNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // Get store values and actions
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const addNode = useStore((state) => state.addNode);
  const getNodeID = useStore((state) => state.getNodeID);
  const handleRemoveNode = useStore((state) => state.removeNode);

  const getInitNodeData = useCallback((nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = event.dataTransfer.getData("application/reactflow");
      
      if (!appData) return;
      
      try {
        const parsedData = JSON.parse(appData);
        const type = parsedData?.nodeType;

        if (!type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: {
            ...getInitNodeData(nodeID, type),
            onRemove: handleRemoveNode,
          },
        };

        addNode(newNode);
      } catch (error) {
        console.error("Error processing drop:", error);
      }
    },
    [reactFlowInstance, addNode, getNodeID, getInitNodeData, handleRemoveNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
