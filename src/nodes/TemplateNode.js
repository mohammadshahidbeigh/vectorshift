import {BaseNode} from "./BaseNode";
import {useState, useEffect} from "react";

export const TemplateNode = ({id, data}) => {
  const [template, setTemplate] = useState(data?.template || "");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const matches = template.match(/\{\{([^}]+)\}\}/g) || [];
    const vars = matches.map((match) => match.slice(2, -2).trim());
    setVariables([...new Set(vars)]);
  }, [template]);

  return (
    <BaseNode
      id={id}
      title="Template"
      inputs={variables.map((v) => ({id: v}))}
      outputs={[{id: "output"}]}
      type="template"
      data={data}
    >
      <textarea
        className="node-input"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        placeholder="Enter template with {{variables}}"
        style={{
          minHeight: "80px",
          resize: "vertical",
        }}
      />
      {variables.length > 0 && (
        <div className="variables-list">Variables: {variables.join(", ")}</div>
      )}
    </BaseNode>
  );
};
