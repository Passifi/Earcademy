import './App.css'
import { Scorer } from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
import { useMemo, useRef, useState, useEffect } from 'react';
import Tooltip from './Components/Tooltip';
import { Synth } from './classes/Synth';
import AnalysisGraph from './Components/AnalysisGraph';
import Settings from './Components/Settings';
import { Difficulties, Setting } from './classes/Setting';
import * as Tone from "tone"
import { Modes } from './Services/score';
function App() {
  const scorer = useRef(new Scorer((el: number) => { setSettings("difficulty", el) }))
  const synth = useMemo(() => new Synth(), []);
  const [feedback, setFeedback] = useState<string | undefined>()
  const [feedback2, setFeedback2] = useState<string | undefined>()
  const [feedbackClass, setFeedbackClass] = useState<string>("right")
  const [setting, setSetting] = useState<Setting>(new Setting(false, Difficulties.Easy, "Pascal"))
  const [score, setScore] = useState(scorer.current.getScore())
  const [mouseCoord, setCoords] = useState({ x: 0, y: 0 })
  const [open, setOpen] = useState(false);

  // setup based on SettingsData
  useEffect(() =>
    synth.setADSR({ attack: 0.01, decay: 0.5, sustain: 0.3, release: 2.9 }), []);

  function setPositiveFeedback() {
    setFeedback("That's right")
    setFeedback2("")
    setFeedbackClass("right")
  }

  function setNegativeFeedback(errorSize: number) {

    if (setting.showHints) {
      var closeOne = Math.abs(errorSize) < 2 ? "But you were really Close!" : "";
      if (errorSize < 0) {
        setFeedback2(() => "You were over! " + closeOne);
      }
      else {
        setFeedback2(() => "You were under! " + closeOne);
      }
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
    if (scorer.current.generateNewChallenge) return;
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
    console.log(setting)
  }

  return (
    <>
      <div className="main-area">
        <div onMouseEnter={(e: React.MouseEvent) => { setCoords({ x: e.pageX, y: e.pageY }); setOpen(true) }} onMouseLeave={(e: React.MouseEvent) => { setOpen(false) }} className='game-container'> <Tooltip mouseX={mouseCoord.x} mouseY={mouseCoord.y} open={open}> Test </Tooltip>
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
            if (scorer.current.generateNewChallenge) scorer.current.generateChallenge()
            if (scorer.current.currentMode == Modes.Simultanous)
              await synth.playSimultanousInterval(scorer.current.currentNote, scorer.current.currentInterval, 8);
            else
              await synth.playInterval(scorer.current.currentNote, scorer.current.currentInterval, 8)
          }}>
            Play
          </button>
          <IntervalSelectionMatrix clickButton={(n: number) => { checkAnswer(n) }} />
        </div>
      </div >
      <div className="settings-area">
        <Settings settings={setting} onChange={setSettings} />
      </div>
    </>
  )
}

export default App
