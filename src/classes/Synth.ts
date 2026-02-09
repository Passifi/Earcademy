import * as Tone from "tone"
import { Note } from "../Services/notes"
export interface Instrument {
  triggerAttackRelease: (note: Tone.Unit.Frequency, duration: Tone.Unit.Time, time?: Tone.Unit.Time, velocity?: number) => void
  toDestination: () => void,
  envelope: Tone.AmplitudeEnvelope
  filterEnvelope: Tone.FrequencyEnvelope
  filter: Tone.Filter
  volume: Tone.Param<"decibels">
}
export interface Envelope {
  attack: number,
  decay: number,
  sustain: number,
  release: number
};

export class Synth {

  instrument: Instrument;
  secondVoice: Instrument;
  constructor() {
    const synth = new Tone.MonoSynth({ oscillator: { type: "square" } }).toDestination();
    synth.filterEnvelope.attack = 0.0;
    synth.filterEnvelope.decay = 0.0;
    synth.filterEnvelope.sustain = 0.0;
    synth.filterEnvelope.release = 0.0;
    const synth2 = new Tone.MonoSynth({ oscillator: { type: "square" } }).toDestination();
    synth2.filterEnvelope.attack = 0.0;
    synth2.filterEnvelope.decay = 0.0;
    synth2.filterEnvelope.sustain = 0.0;
    synth2.filterEnvelope.release = 0.0;

    this.instrument = synth
    this.secondVoice = synth2;
  }

  setFilterCutoff(frequency: number) {
    this.instrument.filter.set({ frequency: frequency })
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
    const now = Tone.now(); // without this synth seems to operate on it's on timeline... 
    this.instrument.triggerAttackRelease(note.getNote(), `${duration}n`, now);
  }

  async playInterval(note: Note, interval: number, duration: number) { // this function has to be triggered by a userdriven event
    const now = Tone.now(); // without this synth seems to operate on it's on timeline... 
    const durationFormatted = `${duration}n`
    const secondNote = note.addInterval(interval)
    this.instrument.triggerAttackRelease(note.getNote(), durationFormatted, now);
    this.instrument.triggerAttackRelease(secondNote.getNote(), durationFormatted, now + 0.5)
  }

  async playSimultanousInterval(note: Note, interval: number, duration: number) { // this function has to be triggered by a userdriven event
    const now = Tone.now(); // without this synth seems to operate on it's on timeline... 
    const durationFormatted = `${duration}n`
    const secondNote = note.addInterval(Math.abs(interval))
    this.instrument.triggerAttackRelease(note.getNote(), durationFormatted, now);
    this.secondVoice.triggerAttackRelease(secondNote.getNote(), durationFormatted, now + 0.01)
  }

};
