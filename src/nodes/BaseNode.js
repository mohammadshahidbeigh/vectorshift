import {Handle, Position} from "reactflow";
import {useState} from "react";

export const BaseNode = ({
  id,
  data,
  title,
  children,
  inputs = [],
  outputs = [],
}) => {
  return (
    <div className="node-container">
      <div className="node-header">
        <span>{title}</span>
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{top: `${((index + 1) * 100) / (inputs.length + 1)}%`}}
        />
      ))}

      <div className="node-content">{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{top: `${((index + 1) * 100) / (outputs.length + 1)}%`}}
        />
      ))}
    </div>
  );
};
