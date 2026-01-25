import './App.css'
import * as Tone from "tone"
import { Note } from './Services/notes';
import { Scorer, Guess } from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
import { useEffect, useMemo, useRef, useState } from 'react';
function App() {
  const synth = new Tone.FMSynth().toDestination();
  Tone.start()

  const scorer = useMemo(()=> new Scorer(), []) 
  const [score, setScore] = useState(scorer.getScore())

  
  function playInterval(note: Note) {
    playNote(note, 12);
    const nextNote = note.addInterval(scorer.currentInterval)
    setTimeout(() => playNote(nextNote, 12), 300)

  }
  function playNote(note: Note, duration: number) {
    synth.triggerAttackRelease(note.getNote(), "8n")

  }

  function checkAnswer(interval: number) {
    if (scorer.checkAnswer(interval)) {
      setScore(scorer.getScore())
    }
    else {
      console.log("False!");
    }
  }

  return (
    <>
      <p>{score}</p>
      <button onClick={() => { playInterval(scorer.currentNote) }} >Play</button>
      <IntervalSelectionMatrix clickButton={(n: number) => { checkAnswer(n) }} />
    </>
  )
}

export default App
