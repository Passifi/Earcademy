import * as Tone from "tone"

export default function PluckSynthSetup() {
  
  const synth = new Tone.PluckSynth().toDestination();
  synth.now() 
 // Tone.start()
  function playNote() {
    synth.triggerAttackRelease("C4", "8n");
  } 

  function setDamping(value) {
    synth.dampening = value*70;
  }

  function setResonance(value) {
    synth.resonance = value/100;
  }

  function setRelease(value) {
    synth.release = value;
  }
  return (

    <div className="pluckSynth-settings">
       
      <input type="range" onChange={(e)=> {setDamping(e.target.value)}} />
      <label > Dampening </label> 

      <input type="range" onChange={(e)=> {setResonance(e.target.value)}} />

      <label > Resonance </label> 
      <input type="range" onChange={(e)=> {setRelease(e.target.value)}} />

      <label > Release </label> 

      <button onClick={playNote}> Test </button>

    </div>

  )


};


