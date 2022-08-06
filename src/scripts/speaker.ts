declare global {
    interface Window {
        webkitAudioContext: any;
    }
  }
class Speaker{
    audioCtx: AudioContext;
    gain: GainNode;
    finish: AudioDestinationNode
    oscillator: any;


    constructor(){
        const AudioContext = window.AudioContext || window.webkitAudioContext
        this.audioCtx = new AudioContext();

        this.gain = this.audioCtx.createGain();
        this.finish = this.audioCtx.destination;

        this.gain.connect(this.finish);

        // // Mute the audio
        // this.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // // Unmute the audio
        // this.gain.setValueAtTime(1, this.audioCtx.currentTime);
    }

    play(frequency: number){
        if (this.audioCtx && !this.oscillator){
            this.oscillator = this.audioCtx.createOscillator();

            this.oscillator.frequency.setValueAtTime(frequency || 440, this.audioCtx.currentTime);

            this.oscillator.type = 'square'

            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }
    }

    stop(){
        if (this.oscillator){
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    }
}
export default Speaker;