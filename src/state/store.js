// store.js

import {createWithEqualityFn} from "zustand/traditional";
import {shallow} from "zustand/shallow";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = createWithEqualityFn(
  (set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
      const newIDs = {...get().nodeIDs};
      if (newIDs[type] === undefined) {
        newIDs[type] = 0;
      }
      newIDs[type] += 1;
      set({nodeIDs: newIDs});
      return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
      set({
        nodes: [...get().nodes, node],
      });
    },
    removeNode: (nodeId) => {
      console.log("Store: Removing node:", nodeId);
      const currentState = get();

      set({
        nodes: currentState.nodes.filter((node) => node.id !== nodeId),
        edges: currentState.edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        ),
      });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            markerEnd: {type: MarkerType.Arrow, height: "20px", width: "20px"},
          },
          get().edges
        ),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = {...node.data, [fieldName]: fieldValue};
          }
          return node;
        }),
      });
    },
  }),
  shallow
);
