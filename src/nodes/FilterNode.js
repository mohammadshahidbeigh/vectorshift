import {BaseNode} from "./BaseNode";
import {useState} from "react";

export const FilterNode = ({id, data}) => {
  const [condition, setCondition] = useState(data?.condition || "");

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{id: "input"}]}
      outputs={[{id: "output"}]}
      type="filter"
    >
      <input
        className="node-input"
        type="text"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="Enter filter condition"
      />
    </BaseNode>
  );
};
