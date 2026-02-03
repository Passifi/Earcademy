import { Setting } from "../classes/Setting"

interface SettingsProps {
  settings: Setting
  onChange: (field: string, value: any) => void
}

export default function Settings(props: SettingsProps) {

  return (
    <div className="settings-container">

      <input type="checkbox" name="hints" checked={props.settings.showHints} onChange={(_) => props.onChange("showHints", !props.settings.showHints)} />
      <label htmlFor="difficulty-slider"> Difficulty </label>
      <input type="range" name="difficulty-slider" value={props.settings.difficulty} onChange={(e) => props.onChange("difficulty", e.target.value)} />
    </div>
  )
}
