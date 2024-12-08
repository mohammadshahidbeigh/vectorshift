// submit.js

import {useStore} from "../state/store";
import {useState} from "react";
import {toast} from "react-toastify";

export const SubmitButton = () => {
  const {nodes, edges} = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      toast.warning("Please add some nodes to your pipeline first!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `pipeline=${encodeURIComponent(JSON.stringify({nodes, edges}))}`,
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(
        <div>
          <h4>Pipeline Analysis</h4>
          <p>Number of Nodes: {data.num_nodes}</p>
          <p>Number of Edges: {data.num_edges}</p>
          <p>Is DAG: {data.is_dag ? "✅ Yes" : "❌ No"}</p>
        </div>,
        {
          autoClose: 5000,
        }
      );
    } catch (error) {
      toast.error("Error submitting pipeline: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isLoading}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 24px",
        fontSize: "16px",
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: isLoading ? "wait" : "pointer",
        opacity: isLoading ? 0.7 : 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        transform: isLoading ? "scale(0.98)" : "scale(1)",
        zIndex: 1000,
      }}
    >
      {isLoading ? "Processing..." : "Submit Pipeline"}
    </button>
  );
};
