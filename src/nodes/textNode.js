// textNode.js

import {BaseNode} from "./BaseNode";
import {useState, useEffect, useRef} from "react";

export const TextNode = ({id, data}) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Function to extract variables from text
  const extractVariables = (text) => {
    const matches = text.match(/\{\{([^}]+)\}\}/g) || [];
    return [...new Set(matches.map((match) => match.slice(2, -2).trim()))];
  };

  // Update variables when text changes
  useEffect(() => {
    const newVars = extractVariables(currText);
    setVariables(newVars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variables.map((v) => ({id: v}))}
      outputs={[{id: "output"}]}
    >
      <textarea
        ref={textareaRef}
        className="node-input"
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        placeholder="Enter text with {{variables}}"
        style={{
          minHeight: "60px",
          width: "100%",
          resize: "none",
          overflow: "hidden",
        }}
      />
      {variables.length > 0 && (
        <div className="variables-list">Variables: {variables.join(", ")}</div>
      )}
    </BaseNode>
  );
};
