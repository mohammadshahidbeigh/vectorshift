// store.js

import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from "reactflow";

// Zustand store for managing nodes, edges, and their interactions
export const useStore = create(
  (set, get) => ({
    // State
    nodes: [],
    edges: [],
    nodeIDs: {},

    // Utility function to generate unique node IDs by type
    getNodeID: (type) => {
      const newIDs = { ...get().nodeIDs };
      if (!newIDs[type]) {
        newIDs[type] = 0;
      }
      newIDs[type] += 1;
      set({ nodeIDs: newIDs });
      return `${type}-${newIDs[type]}`;
    },

    // Add a new node to the state
    addNode: (node) => {
      set((state) => ({
        nodes: [...state.nodes, node],
      }));
    },

    // Remove a node and its associated edges
    removeNode: (nodeId) => {
      console.log("Store: Removing node:", nodeId);
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
        edges: state.edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        ),
      }));
    },

    // Handle node changes (e.g., dragging, resizing)
    onNodesChange: (changes) => {
      set((state) => ({
        nodes: applyNodeChanges(changes, state.nodes),
      }));
    },

    // Handle edge changes (e.g., deletion, reconnection)
    onEdgesChange: (changes) => {
      set((state) => ({
        edges: applyEdgeChanges(changes, state.edges),
      }));
    },

    // Handle new connections between nodes
    onConnect: (connection) => {
      set((state) => ({
        edges: addEdge(
          {
            ...connection,
            type: "smoothstep",
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
          },
          state.edges
        ),
      }));
    },

    // Update specific fields in a node's data
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
            : node
        ),
      }));
    },
  }),
  shallow // Use shallow for efficient state comparison
);
