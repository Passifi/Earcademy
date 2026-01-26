import './App.css'
import * as Tone from "tone"
import { Note } from './Services/notes';
import { Scorer, Guess } from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Synths } from './Components/SynthSelection';
import SynthSelection from './Components/SynthSelection';
import PluckSynthSetup from './Components/PluckSynthSetup';
function App() {
  
  const refSynth  = new Tone.PluckSynth().toDestination();
  refSynth.resonance = 1.0;
  refSynth.release = 0.9;
  let synth: Synths = refSynth

  const scorer = useMemo(() => new Scorer(), [])
  const [score, setScore] = useState(scorer.getScore())

  function synthSetter(newSynth: Synths) {
    synth = newSynth;
    synth.toDestination()
  }
  function playInterval(note: Note) {
   
    Tone.start()
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
      <SynthSelection synthSetCallback={synthSetter} />
    </>
  )
}

export default App
