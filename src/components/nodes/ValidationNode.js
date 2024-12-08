import {BaseNode} from "./BaseNode";
import {useState} from "react";

export const ValidationNode = ({id, data}) => {
  const [rules, setRules] = useState(data?.rules || []);
  const [newRule, setNewRule] = useState("");

  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule("");
    }
  };

  return (
    <BaseNode
      id={id}
      title="Validation"
      inputs={[{id: "input"}]}
      outputs={[{id: "valid"}, {id: "invalid"}]}
      type="validation"
      data={data}
    >
      <div>
        <input
          className="node-input"
          type="text"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          placeholder="Add validation rule"
        />
        <button onClick={addRule}>Add Rule</button>
        <ul className="rules-list">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </BaseNode>
  );
};
