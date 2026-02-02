import './App.css'
import * as Tone from "tone"
import { Note } from './Services/notes';
import { Scorer } from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
import { useMemo, useRef, useState } from 'react';
import { Synth } from './classes/Synth';
import AnalysisGraph from './Components/AnalysisGraph';
import GameModeSelection from './Components/GameModeSelection';

function App() {
  const synth = useRef<Synth>(new Synth());
  const [feedback, setFeedback] = useState<string | undefined>()
  const [feedback2, setFeedback2] = useState<string | undefined>()
  const [feedbackClass, setFeedbackClass] = useState<string>("right")
  synth.current.setADSR({ attack: 0.01, decay: 0.5, sustain: 0.3, release: 2.9 });
  const scorer = useRef(new Scorer())
  const [score, setScore] = useState(scorer.current.getScore())
  async function playInterval(note: Note) {
    await Tone.start();
    playNote(note, 8);
    const nextNote = note.addInterval(scorer.current.currentInterval)
    setTimeout(() => playNote(nextNote, 8), 300) // this is probably an issue
  }
  function playNote(note: Note, duration: number) {
    synth.current.setTriggerRelease(note, duration);
  }

  function checkAnswer(interval: number) {
    var result = scorer.current.checkAnswer(interval);
    if (result.correct) {
      setScore(scorer.current.getScore())
      setFeedback("That's right")
      setFeedback2("")
      setFeedbackClass("right")
    }
    else {

      var closeOne = Math.abs(result.errorSize) < 2 ? "But you were really Close!" : "";
      if (result.errorSize < 0) {
        setFeedback2(() => "You were over! " + closeOne);
      }
      else {
        setFeedback2(() => "You were under! " + closeOne);
      }
      setFeedback(() => "Wrong guess. Try again!");
      setFeedbackClass("wrong")
    }
  }

  return (
    <>
      <AnalysisGraph guesses={scorer.current.guessData} />
      <p className={"feedback " + feedbackClass}>
        {feedback} <br />
        {feedback2}
      </p >
      <div>
        <h3>Score: </h3>{score.toFixed(2)}</div>
      <button onClick={async () => { await playInterval(scorer.current.currentNote) }} >Play</button>

      <IntervalSelectionMatrix clickButton={(n: number) => { checkAnswer(n) }} />

      <GameModeSelection initialMode={scorer.current.currentMode} setModeCallback={(m) => scorer.current.setGameMode(m)} />
    </>
  )
}

export default App
