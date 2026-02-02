import { Modes } from "../Services/score"
import { useState } from "react";

interface GameModeSelection {
  initialMode: number;
  setModeCallback: (mode: number) => void
}


export default function GameModeSelection(props: GameModeSelection) {

  const [mode, setMode] = useState(props.initialMode)
  return (
    <div className="mode-selection-container">

      <ul>

        {(Object.keys(Modes) as Array<keyof typeof Modes>).map(el =>
        (
          <li><button className={Modes[el] === mode ? "active-btn" : ""} onClick={() => { setMode(Modes[el]); props.setModeCallback(Modes[el]) }}>{el}</button> </li>
        )

        )}

      </ul>

    </div >
  )


}

