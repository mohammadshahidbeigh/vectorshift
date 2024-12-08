import {Handle, Position} from "reactflow";
import {motion} from "framer-motion";

export const BaseNode = ({
  id,
  data,
  title,
  children,
  inputs = [],
  outputs = [],
  type,
}) => {
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Remove clicked for node:", id, "data:", data);

    if (data && typeof data.onRemove === "function") {
      data.onRemove(id);
    } else {
      console.error("onRemove is not available", {id, data});
    }
  };

  return (
    <motion.div
      className={`node-container ${type}-node`}
      initial={{scale: 0.8, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      exit={{scale: 0.8, opacity: 0}}
    >
      <div className="node-header">
        <span>{title}</span>
        <button
          className="node-remove-btn"
          onClick={handleRemove}
          type="button"
          aria-label="Remove node"
        >
          ×
        </button>
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{top: `${((index + 1) * 100) / (inputs.length + 1)}%`}}
          className="handle input-handle"
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
          className="handle output-handle"
        />
      ))}
    </motion.div>
  );
};
