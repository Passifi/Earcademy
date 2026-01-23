import './App.css'
import * as Tone from "tone"
const notes = ["C", "Db", "D", "Eb", "E",
     "F", "Gb", "G", "Ab", "A", "Bb", "B"
  ]
 
class Note {
  baseNote : number;
  octave: number;
  constructor(base: number=-1, octave: number=-1
  ) {

    this.baseNote = base;
    this.octave = octave;
    if(base == -1) {
      this.baseNote = Math.ceil(Math.random()*12)
      this.octave = 4
    }
    
  }
  getNote() {
    console.log(notes)  
      const result = notes[this.baseNote] + this.octave 
     console.log(`${result}: ${this.baseNote} ${this.octave}`)
     return notes[this.baseNote] + this.octave  
  }
  addInterval(interval: number) {
      this.baseNote += interval 
      if(this.baseNote >= 12) {
          
          this.baseNote = this.baseNote - 12
          this.octave++
      }
      else if(this.baseNote < 0) {
        this.baseNote = 12 + this.baseNote
        this.octave--;
      }
      console.log(this.baseNote)
  }
};

function App() {
  const synth = new Tone.Synth().toDestination();
  Tone.start() 
  const note = new Note(1,4);

  function playNote(note: Note, duration: number) {
    synth.triggerAttackRelease(note.getNote(), "8n") 
  }
  return (
    <>
      <p>Reference</p>


      <button onClick={()=>{playNote(note,2); note.addInterval(-2)}}>Play</button>
    </>
  )
}

export default App
