export const IntervalNames = [
  "prime", "minor second", "major second", "minor third", "major third",
  "fourth", "tritonus", "fifth", "minor sixth", "major sixth", "minor seventh",
  "major seventh", "octave"
]


interface IntervalSelectionProps {

  clickButton: (e: number) => void
}

export default function IntervalSelectionMatrix(props: IntervalSelectionProps) {
  const rows = [
    IntervalNames.slice(0, 4).map((el, index) => ({ title: el, value: index })),

    IntervalNames.slice(4, 8).map((el, index) => ({ title: el, value: index + 4 })),
    IntervalNames.slice(8, 13).map((el, index) => ({ title: el, value: index + 8 })),
  ]
  return (
    <div className="interval-selection-container">
      {
        rows.map((row) =>
        (
          <div className="row">
            {row.map((el) => (
              <button onClick={() => props.clickButton(el.value)}>{el.title}</button>
            ))}


          </div>
        ))


      }
    </div>
  )
}
