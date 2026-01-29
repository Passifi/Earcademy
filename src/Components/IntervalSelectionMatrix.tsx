export const IntervalNames = [
  "prime", "minor second", "major second", "minor third", "major third",
  "fourth", "tritonus", "fifth", "minor sixth", "major sixth", "minor seventh",
  "major seventh", "octave"
]

interface IntervalSelectionProps {
  clickButton: (e: number) => void
}

export default function IntervalSelectionMatrix(props: IntervalSelectionProps) {
  return (
    <div className="interval-selection-container">
      <div className="row">
        {IntervalNames.slice(0, 5).map((el, index) => (
          <div key={index} className="column">
            <button onClick={() => props.clickButton(index)}>{el}</button>
          </div>
        ))}
      </div>
      <div className="row">
        {IntervalNames.slice(5, 10).map((el, index) => (
          <div key={index + 5} className="column">
            <button onClick={() => props.clickButton(index + 5)}>{el}</button>
          </div>
        ))}
      </div>
      <div className="row">
        {IntervalNames.slice(10, 13).map((el, index) => (
          <div key={index + 10} className="column">
            <button onClick={() => props.clickButton(index + 10)}>{el}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

