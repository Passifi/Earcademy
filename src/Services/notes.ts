const notes = ["C", "Db", "D", "Eb", "E",
  "F", "Gb", "G", "Ab", "A", "Bb", "B"
]

const Octave = 12;

export class Note {
  baseNote: number;
  octave: number;
  constructor(base: number, octave: number) {
    this.baseNote = base;
    this.octave = octave;

  }
  getNote() {
    return notes[this.baseNote] + this.octave
  }
  addInterval(interval: number) {
    let octave = 0
    let newNote = this.baseNote
    newNote += interval
    if (newNote >= Octave) {
      newNote = newNote - Octave
      octave = 1
    }
    else if (newNote < 0) {
      newNote = Octave + newNote
      octave = -1
    }
    return new Note(newNote, this.octave + octave)
  }
};

