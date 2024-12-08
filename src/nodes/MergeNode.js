import {BaseNode} from "./BaseNode";
import {useState} from "react";

export const MergeNode = ({id, data}) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || "concat");

  return (
    <BaseNode
      id={id}
      title="Merge"
      inputs={[{id: "input1"}, {id: "input2"}]}
      outputs={[{id: "output"}]}
      type="merge"
      data={data}
    >
      <select
        className="node-select"
        value={mergeType}
        onChange={(e) => setMergeType(e.target.value)}
      >
        <option value="concat">Concatenate</option>
        <option value="join">Join</option>
        <option value="zip">Zip</option>
      </select>
    </BaseNode>
  );
};
