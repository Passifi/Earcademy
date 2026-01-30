import { Modes } from "../Services/score"


interface GameModeSelection {
  setModeCallback: (mode: number) => void
}


export default function GameModeSelection() {


  return (
    <div className="mode-selection-container">

      <ul>

        {(Object.keys(Modes) as Array<keyof typeof Modes>).map(el =>
        (
          <li><button onClick={() => { console.log(Modes[el]) }}>{el}</button> </li>
        )

        )}

      </ul>

    </div>
  )


}

