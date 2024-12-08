// llmNode.js

import {BaseNode} from "./BaseNode";

export const LLMNode = ({id, data}) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[{id: "system"}, {id: "prompt"}]}
      outputs={[{id: "response"}]}
      type="llm"
      data={data}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
