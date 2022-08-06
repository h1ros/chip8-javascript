"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Speaker = /** @class */ (function () {
    function Speaker() {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.gain = this.audioCtx.createGain();
        this.finish = this.audioCtx.destination;
        this.gain.connect(this.finish);
        // // Mute the audio
        // this.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // // Unmute the audio
        // this.gain.setValueAtTime(1, this.audioCtx.currentTime);
    }
    Speaker.prototype.play = function (frequency) {
        if (this.audioCtx && !this.oscillator) {
            this.oscillator = this.audioCtx.createOscillator();
            this.oscillator.frequency.setValueAtTime(frequency || 440, this.audioCtx.currentTime);
            this.oscillator.type = 'square';
            this.oscillator.connect(this.gain);
            this.oscillator.start();
        }
    };
    Speaker.prototype.stop = function () {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator.disconnect();
            this.oscillator = null;
        }
    };
    return Speaker;
}());
exports.default = Speaker;
