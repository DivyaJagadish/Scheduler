import { useState } from "react";

export  default function useVisualMode(Intial){
const  [mode,setMode] =useState(Intial);
const [history, setHistory] = useState([initial]);

function transition(newMode){
  setMode(prev=> prev = newMode);
  setHistory(prev=> prev = newMode);
};

function back() { /* ... */ }
 return {mode, transition,back }
}