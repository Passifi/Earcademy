import type { Guess } from "../Services/score"
import { IntervalNames } from "./IntervalSelectionMatrix";
interface AnalysisProp {
  guesses: Guess[];
};

export default function AnalysisGraph(props: AnalysisProp) {
  const analyzer: Map<number, boolean[]> = new Map<number, boolean[]>()
  for (var el of props.guesses) {
    if (analyzer.has(el.interval)) {
      analyzer.get(el.interval)!.push(el!.correct)
    }
    else {
      analyzer.set(el.interval, [el.correct])
    }
  }
  const values = []
  for (var k of analyzer.keys()) {
    const correct = analyzer.get(k)!.filter(el => el).length

    values.push([k, correct / analyzer.get(k)!.length]);
  }

  values.sort((a, b) => a[0] - b[0]);
  function feedbackClass(value: number): string {
    if (value > 0.7) {
      return "goodRatio";
    }
    else if (value > 0.2) {
      return "neutral";
    }
    else {
      return "badRatio"
    }
  }

  return (
    <div className="analyze-container">
      <ul >
        {
          values.map(el => (
            <li key={el[0]} className={feedbackClass(el[1])} style={{ height: el[1] * 100 }}>
              {IntervalNames[el[0]]} {(el[1] * 100).toFixed(2)}%
            </li>
          ))
        }
      </ul>
    </div>
  )
}
