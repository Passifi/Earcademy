import { Setting, Difficulties } from "../classes/Setting"
import { useState } from "react"
import "../settings.css"
import GameModeSelection from "./GameModeSelection"
interface SettingsProps {
  settings: Setting
  onChange: (field: string, value: any) => void
}




export default function Settings(props: SettingsProps) {
  const [difficulty, setDifficulty] = useState(props.settings.difficulty)

  const difficultFields = Object.fromEntries(Object.entries(Difficulties).map(([key, value]) => [value, key]));
  return (
    <div className="settings-container">
      <div>
        <input type="checkbox" name="hints" checked={props.settings.showHints} onChange={(_) => props.onChange("showHints", !props.settings.showHints)} />
        <label htmlFor="hints"> Show Hints </label>
      </div>
      <div className="difficulty-slider-container">
        <label htmlFor="difficulty-slider"> Difficulty </label>
        <input type="range" name="difficulty-slider" value={props.settings.difficulty} onChange={(e) => { props.onChange("difficulty", e.target.value); setDifficulty(Number(e.target.value)); }} step="10" min={10} max={50} />

      </div >
      <span>{difficultFields[difficulty]}</span>
      <GameModeSelection initialMode={props.settings.gameMode} setModeCallback={(e: any) => props.onChange("game-mode", e)} />

    </div>
  )
}
