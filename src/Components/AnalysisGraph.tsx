import type { Guess } from "../Services/score"

interface AnalysisProp {
  guesses: Guess[];  
};

export default function AnalysisGraph(props: AnalysisProp) {
  
  const analyzer: Map<number, boolean[]> = new Map<number, boolean[]>() 
  for(var el of props.guesses) {
    if(analyzer.has(el.interval)) {
      analyzer.get(el.interval)!.push(el!.correct)
    }
    else {
      analyzer.set(el.interval,[el.correct])
    }
  }
  const values = [] 
  for (var k of analyzer.keys()) {
    const correct =analyzer.get(k)!.filter(el=>el).length

    values.push([k,correct/analyzer.get(k)!.length]);
  }
    
  return (
    <div className="analyize-container">
      <ul> 
        {
          values.map(el=> (
            <li>
                {el[0]} {el[1]}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
