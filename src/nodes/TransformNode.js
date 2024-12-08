import {BaseNode} from "./BaseNode";
import {useState} from "react";

export const TransformNode = ({id, data}) => {
  const [transform, setTransform] = useState(data?.transform || "");

  return (
    <BaseNode
      id={id}
      title="Transform"
      inputs={[{id: "input"}]}
      outputs={[{id: "output"}]}
      type="transform"
      data={data}
    >
      <select
        className="node-select"
        value={transform}
        onChange={(e) => setTransform(e.target.value)}
      >
        <option value="">Select transform...</option>
        <option value="uppercase">To Uppercase</option>
        <option value="lowercase">To Lowercase</option>
        <option value="capitalize">Capitalize</option>
        <option value="trim">Trim</option>
        <option value="number">To Number</option>
      </select>
    </BaseNode>
  );
};
