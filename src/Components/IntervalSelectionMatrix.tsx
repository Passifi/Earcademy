export const IntervalNames = [
  "prime", "minor second", "major second", "minor third", "major third",
  "fourth", "tritonus", "fifth", "minor sixth", "major sixth", "minor seventh",
  "major seventh", "octave"
]

const intervalrange = 4;

interface IntervalSelectionProps {
  clickButton: (e: number) => void
}

export default function IntervalSelectionMatrix(props: IntervalSelectionProps) {

  return (
    <div className="interval-selection-container">
      {
        Array.from({ length: 3 }).map((_, rangeMultiplier) =>
        (
          <div className="row">
            {IntervalNames.slice(rangeMultiplier * intervalrange, intervalrange * (1 + rangeMultiplier)).map((el, index) => (
              <button onClick={() => props.clickButton(index)}>{el}</button>
            ))}


          </div>
        ))


      }
    </div>
  )
}
