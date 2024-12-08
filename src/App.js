import {useState, useEffect} from "react";
import {PipelineToolbar} from "./toolbar";
import {PipelineUI} from "./ui";
import {SubmitButton} from "./submit";
import {Tutorial} from "./components/Tutorial";
import {ThemeToggle} from "./components/ThemeToggle";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/tutorial.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setIsFirstVisit(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = theme;
  }, [theme]);

  const handleTutorialComplete = () => {
    localStorage.setItem("hasVisitedBefore", "true");
    setIsFirstVisit(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.body.setAttribute(
      "data-theme",
      theme === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <Tutorial
        isFirstVisit={isFirstVisit}
        onComplete={handleTutorialComplete}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}

export default App;
