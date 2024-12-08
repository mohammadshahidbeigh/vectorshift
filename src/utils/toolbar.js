// toolbar.js

import {DraggableNode} from "./nodeDraggable";

export const PipelineToolbar = () => {
  return (
    <div style={{padding: "10px"}}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="merge" label="Merge" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="template" label="Template" />
        <DraggableNode type="validation" label="Validation" />
        <DraggableNode type="transform" label="Transform" />
      </div>
    </div>
  );
};
