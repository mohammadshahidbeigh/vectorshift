// submit.js

import {useStore} from "./store";
import {useState} from "react";

export const SubmitButton = () => {
  const {nodes, edges} = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
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

      alert(
        `Pipeline Analysis:\n\n` +
          `Number of Nodes: ${data.num_nodes}\n` +
          `Number of Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      alert("Error submitting pipeline: " + error.message);
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
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: isLoading ? "wait" : "pointer",
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {isLoading ? "Processing..." : "Submit Pipeline"}
    </button>
  );
};
