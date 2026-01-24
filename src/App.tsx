import './App.css'
import * as Tone from "tone"
import { Note } from './Services/notes';
import {Scorer, Guess} from "./Services/score"
import IntervalSelectionMatrix from './Components/IntervalSelectionMatrix';
function App() {
  const synth = new Tone.Synth().toDestination();
  Tone.start() 
  const note = new Note(1,4);
  const scorer = new Scorer()
  const interval = scorer.generateInterval(12);

  function playInterval(note: Note) {
    playNote(note,12);
    const nextNote = note.addInterval(interval)
    setTimeout(()=>playNote(nextNote,12),300)
 
    }
  function playNote(note: Note, duration: number) {
    synth.triggerAttackRelease(note.getNote(), "8n")
 
  }
  


  return (
    <>
      <p>{scorer.getScore()}</p>


      <button onClick={()=>{playInterval(note)}} >Play</button>
      <IntervalSelectionMatrix clickButton={(n: number) => {console.log(n)}}/> 
    </>
  )
}

export default App
