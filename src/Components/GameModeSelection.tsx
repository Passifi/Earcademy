import { Modes } from "../Services/score"


interface GameModeSelection {
  setModeCallback: (mode: number) => void
}


export default function GameModeSelection(props: GameModeSelection) {


  return (
    <div className="mode-selection-container">

      <ul>

        {(Object.keys(Modes) as Array<keyof typeof Modes>).map(el =>
        (
          <li><button onClick={() => { props.setModeCallback(Modes[el]) }}>{el}</button> </li>
        )

        )}

      </ul>

    </div >
  )


}

