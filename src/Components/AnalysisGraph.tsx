import type { Guess } from "../Services/score"
import { IntervalNames } from "./IntervalSelectionMatrix";
interface AnalysisProp {
  possibleIntervals: any[];
  guesses: Guess[];
};

export default function AnalysisGraph(props: AnalysisProp) {
  const analyzer: Map<number, boolean[]> = new Map<number, boolean[]>()

  for (let el of props.guesses) {
    if (analyzer.has(el.interval)) {
      analyzer.get(el.interval)!.push(el!.correct)
    }
    else {
      analyzer.set(el.interval, [el.correct])
    }
  }

  for (let el of props.possibleIntervals) {

    if (!analyzer.has(el)) {
      analyzer.set(el, [])
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
    else if (value > 0.0) {
      return "badRatio"
    }
    else {
      return "neutral"
    }
  }

  function getColor(percentage: number) {
    if (isNaN(percentage)) {
      percentage = 1.0;
    }
    const hue = percentage * 100 * 1.2;

    return `hsl(${hue}, 100%, 30%)`;
  }

  return (
    <div className="analyze-container">
      <ul >
        {
          values.map((el, index) => (
            <li key={el[0]} className={feedbackClass(el[1])} style={{ backgroundColor: getColor(el[1]), height: el[1] > 0 ? el[1] * 100 : 100 }}>
              {index + 1}
            </li>
          ))
        }
      </ul>
      <div className="legend">
        <ul>
          {values.map((el, index) =>
          (
            <li key={"legendNo" + index} >
              {1 + index}: {IntervalNames[el[0]]}
            </li>)
          )

          }
        </ul>
      </div>
    </div>
  )
}
