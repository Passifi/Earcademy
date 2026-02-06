import './App.css'
import { Scorer } from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Synth } from './classes/Synth';
import AnalysisGraph from './Components/AnalysisGraph';
import GameModeSelection from './Components/GameModeSelection';
import Settings from './Components/Settings';
import { Difficulties, Setting } from './classes/Setting';
import PluckSynthSetup from './Components/PluckSynthSetup';
import * as Tone from "tone"
function App() {
  const scorer = useRef(new Scorer())
  const synth = useMemo(() => new Synth(), []);
  const [feedback, setFeedback] = useState<string | undefined>()
  const [feedback2, setFeedback2] = useState<string | undefined>()
  const [feedbackClass, setFeedbackClass] = useState<string>("right")
  const [setting, setSetting] = useState<Setting>(new Setting(false, Difficulties.Easy, "Pascal"))
  const [score, setScore] = useState(scorer.current.getScore())
  // setup based on SettingsData
  useEffect(() =>
    synth.setADSR({ attack: 0.01, decay: 0.5, sustain: 0.3, release: 2.9 }), []);

  function setPositiveFeedback() {
    setFeedback("That's right")
    setFeedback2("")
    setFeedbackClass("right")
  }

  function setNegativeFeedback(errorSize: number) {
    var closeOne = Math.abs(errorSize) < 2 ? "But you were really Close!" : "";
    if (errorSize < 0) {
      setFeedback2(() => "You were over! " + closeOne);
    }
    else {
      setFeedback2(() => "You were under! " + closeOne);
    }
    setFeedback(() => "Wrong guess. Try again!");
    setFeedbackClass("wrong")
  }

  function generateFeedback(result: any) {
    if (result.correct) {
      setScore(scorer.current.getScore())
      setPositiveFeedback();
    }
    else {
      setNegativeFeedback(result.errorSize)
    }
  }

  function checkAnswer(interval: number) {
    var result = scorer.current.checkAnswer(interval);
    generateFeedback(result)
  }

  function setSettings(field: string, value: any) {
    setSetting((formerSetting: Setting) => ({ ...formerSetting, [field]: value }))
    if (field === "difficulty") {
      scorer.current.Difficulty = value
    }
    if (field === "game-mode") {
      scorer.current.setGameMode(value)
    }

  }

  return (
    <>
      <div className="settings-area">
        <Settings settings={setting} onChange={setSettings} />
      </div>
      <div className="main-area">
        <div className='game-container'>
          <AnalysisGraph possibleIntervals={scorer.current.getPossibleIntervals()} guesses={scorer.current.guessData} />
          <p className={"feedback " + feedbackClass}>
            {feedback} <br />
            {feedback2}
          </p >
          <div>
            <h3>Score: </h3>{score.toFixed(2)}</div>
          <button onClick={async () => {
            if (Tone.getContext().state != "running")
              await Tone.start();
            await synth.playInterval(scorer.current.currentNote, scorer.current.currentInterval, 8);
          }}>
            Play
          </button>
          <IntervalSelectionMatrix clickButton={(n: number) => { checkAnswer(n) }} />
        </div>

      </div>
    </>
  )
}

export default App
