const notes = ["C", "Db", "D", "Eb", "E",
  "F", "Gb", "G", "Ab", "A", "Bb", "B"
]

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
    if (newNote >= 12) {
      newNote = newNote - 12
      octave = 1
    }
    else if (newNote < 0) {
      newNote = 12 + newNote
      octave = -1
    }
    return new Note(newNote, this.octave + octave)
  }
};

