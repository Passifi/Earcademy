import './App.css'
import * as Tone from "tone"
import { Note } from './Services/notes';
import { Scorer } from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Synth } from './classes/Synth';
import AnalysisGraph from './Components/AnalysisGraph';
 

function App() {
   const synth = new Synth();
  const [feedback, setFeedback] = useState<string | undefined>()
  const [feedbackClass, setFeedbackClass] = useState<string>("right")
  synth.setADSR({ attack: 0.01, decay: 0.5, sustain: 0.3, release: 2.9 });
  const scorer = useMemo(() => new Scorer(), [])
  const [score, setScore] = useState(scorer.getScore())


  async function playInterval(note: Note) {
    await Tone.start();
    playNote(note, 8);
    const nextNote = note.addInterval(scorer.currentInterval)
    setTimeout(() => playNote(nextNote, 8), 300)

  }
  function playNote(note: Note, duration: number) {
    synth.setTriggerRelease(note, duration);
  }

  function checkAnswer(interval: number) {
    if (scorer.checkAnswer(interval)) {
      setScore(scorer.getScore())
      setFeedback("That's right")
      setFeedbackClass("right")
    }
    else {
      setFeedback("Wrong guess. Try again!")
      setFeedbackClass("wrong")
    }
  }

  return (
    <>
      <AnalysisGraph guesses={scorer.guesses}/>
      <p className={"feedback " + feedbackClass}>

        {feedback}

      </p >
      <p>{score}</p>
      <button onClick={async () => { playInterval(scorer.currentNote) }} >Play</button>
      <IntervalSelectionMatrix clickButton={(n: number) => { checkAnswer(n) }} />
    </>
  )
}

export default App
