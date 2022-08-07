declare global {
    interface Window {
        webkitAudioContext: any;
    }
}
declare class Speaker {
    audioCtx: AudioContext;
    gain: GainNode;
    finish: AudioDestinationNode;
    oscillator: any;
    constructor();
    play(frequency: number): void;
    stop(): void;
}
export default Speaker;
