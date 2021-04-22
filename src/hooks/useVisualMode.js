import { useState } from "react";

// Custom hook for transition from one dstate to another 

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition to another mode
  function transition(newMode, replace = false) {
    setMode(prev => prev = newMode);
    if (replace) {
      history[history.length - 1] = newMode;
    }
    else {
      setHistory(prev => prev = [...prev, newMode]);
    }
  };

  // transition to previous mode
  function back() {
    if (history.length > 1) {
      history.pop();
      const newMode = history[history.length - 1]
      setMode(prev => prev = newMode)
    }
  }
  return { mode, transition, back }
}