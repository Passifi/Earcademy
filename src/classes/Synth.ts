import * as Tone from "tone"
import { Note } from "../Services/notes"
export interface Instrument {
  triggerAttackRelease: (note: Tone.Unit.Frequency, duration: Tone.Unit.Time, time?: Tone.Unit.Time, velocity?: number) => void
  toDestination: () => void,
  envelope: Tone.AmplitudeEnvelope
  volume: Tone.Param<"decibels">
}

interface Envelope {
  attack: number,
  decay: number,
  sustain: number,
  release: number
};

export class Synth {


  instrument: Instrument;
  constructor() {
    const synth = new Tone.MonoSynth({ oscillator: { type: "square" } }).toDestination();
    synth.filterEnvelope.attack = 0.0;
    synth.filterEnvelope.decay = 0.0;
    synth.filterEnvelope.sustain = 0.0;
    synth.filterEnvelope.release = 0.0;
    this.instrument = synth
  }

  setFilterCutoff() {

  }

  setADSR(values: Envelope) {
    this.instrument.envelope.attack = values.attack;
    this.instrument.envelope.decay = values.decay;
    this.instrument.envelope.release = values.release;
    this.instrument.envelope.sustain = values.sustain;
  }

  setVolume(decibels: number) {
    this.instrument.volume.value = decibels;
  }

  setTriggerRelease(note: Note, duration: number) {
    this.instrument.triggerAttackRelease(note.getNote(), `${duration}n`);
  }



};
