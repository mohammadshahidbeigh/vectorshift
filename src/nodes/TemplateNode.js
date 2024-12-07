import {BaseNode} from "./BaseNode";
import {useState} from "react";

export const TemplateNode = ({id, data}) => {
  const [template, setTemplate] = useState(data?.template || "");
  const [variables, setVariables] = useState(data?.variables || []);

  // Extract variables from template string
  const updateVariables = (newTemplate) => {
    const matches = newTemplate.match(/\{\{([^}]+)\}\}/g) || [];
    const vars = matches.map((match) => match.slice(2, -2).trim());
    setVariables([...new Set(vars)]);
    setTemplate(newTemplate);
  };

  return (
    <BaseNode
      id={id}
      title="Template"
      inputs={variables.map((v) => ({id: v}))}
      outputs={[{id: "output"}]}
    >
      <textarea
        className="node-input"
        value={template}
        onChange={(e) => updateVariables(e.target.value)}
        placeholder="Enter template with {{variables}}"
        rows={4}
      />
      <div>Variables: {variables.join(", ")}</div>
    </BaseNode>
  );
};
