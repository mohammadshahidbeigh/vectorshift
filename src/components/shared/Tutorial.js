import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

const tutorialSteps = [
  {
    title: "Welcome to Pipeline Builder!",
    content: "Let's walk through how to create your first pipeline.",
    position: {top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
  },
  {
    title: "Adding Nodes",
    content: "Drag nodes from the left toolbar into the workspace.",
    position: {top: "20%", left: "200px", transform: "translateY(-50%)"},
  },
  {
    title: "Connecting Nodes",
    content: "Click and drag from one handle to another to connect nodes.",
    position: {top: "50%", left: "50%", transform: "translate(-50%, -50%)"},
  },
  {
    title: "Node Configuration",
    content: "Click on any node to configure its settings.",
    position: {top: "30%", right: "200px", transform: "translateY(-50%)"},
  },
  {
    title: "Submitting Pipeline",
    content: "Click the Submit button to validate your pipeline.",
    position: {bottom: "100px", right: "100px"},
  },
];

export const Tutorial = ({isFirstVisit, onComplete}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(isFirstVisit);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      onComplete();
    }
  };

  const handleSkip = () => {
    setShowTutorial(false);
    onComplete();
  };

  if (!showTutorial) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="overlay"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="tutorial-overlay"
      >
        <motion.div
          key={`step-${currentStep}`}
          className="tutorial-card"
          style={tutorialSteps[currentStep].position}
          initial={{opacity: 0, scale: 0.9, y: 20}}
          animate={{opacity: 1, scale: 1, y: 0}}
          exit={{opacity: 0, scale: 0.9, y: -20}}
          transition={{duration: 0.3}}
        >
          <h3>{tutorialSteps[currentStep].title}</h3>
          <p>{tutorialSteps[currentStep].content}</p>
          <div className="tutorial-controls">
            <button className="tutorial-button" onClick={handleSkip}>
              Skip Tutorial
            </button>
            <div className="tutorial-progress">
              {tutorialSteps.map((_, index) => (
                <span
                  key={index}
                  className={`progress-dot ${
                    index === currentStep ? "active" : ""
                  }`}
                />
              ))}
            </div>
            <button className="tutorial-button primary" onClick={handleNext}>
              {currentStep === tutorialSteps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
