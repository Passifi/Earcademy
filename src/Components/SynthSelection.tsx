import * as Tone from "tone";

interface SynthSelectionProps {
  synthSetCallback: (synth: Synths) => void
}

export interface Synths {
  triggerAttackRelease: (note: Tone.Unit.Frequency, duration: Tone.Unit.Time, time?: Tone.Unit.Time, velocity?: number) => void
  toDestination: () => void,
}

export default function SynthSelection(props: SynthSelectionProps) {


  const synths: string[] = ["AM", "FM", "Pluck", "Mono"]

  const choseSynth = (val: string) => {
    console.log("Chosing Synth");
    var synth = undefined;
    if (val === "AM") {
      synth = new Tone.AMSynth();
      synth.envelope.attack = 0;
      synth.envelope.decay = 1;
      synth.envelope.sustain = 1;
      synth.envelope.release = 0.9;
    }
    else if (val === "FM") {
      synth = new Tone.FMSynth();
      synth.envelope.attack = 0;
      synth.envelope.decay = 0;
      synth.envelope.sustain = 1;
      synth.envelope.release = 0.2;

    }
    else if (val === "Pluck") {
      synth = new Tone.PluckSynth();
      synth.dampening = 6000;
      synth.resonance = 1.0
      synth.release = 0.4;

    }
    else
      synth = new Tone.Synth();

    props.synthSetCallback(synth)
  }

  return (
    <div className="synth-selection-container">

      {
        synths.map((el) => (

          <>
            <input type="radio" id={el} name="chosen-synth" value={el} onChange={() => choseSynth(el)} />
            <label htmlFor={el} > {el} </label>

          </>

        )

        )
      }


    </div >

  )

}
