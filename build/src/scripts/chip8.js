"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHIP8 = void 0;
const renderer_js_1 = require("./renderer.js");
const keyboard_js_1 = require("./keyboard.js");
const speaker_js_1 = require("./speaker.js");
const cpu_js_1 = require("./cpu.js");
class CHIP8 {
    constructor() {
        this.step = () => {
            this.elapsed = Date.now() - this.then;
            if (this.elapsed > this.fpsInterval && !this.cpu.paused) {
                // Cycle the CPU
                this.cpu.cycle();
                this.then = Date.now();
            }
            this.loop = requestAnimationFrame(this.step);
        };
        console.log('CHIP8 is constructed');
        let fps = 60;
        this.fpsInterval = 1000 / fps;
        const renderer = new renderer_js_1.default(10);
        const keyboard = new keyboard_js_1.default();
        const speaker = new speaker_js_1.default();
        const cpu = new cpu_js_1.default(renderer, keyboard, speaker);
        this.cpu = cpu;
    }
    init(rom_game) {
        this.then = Date.now();
        this.startTime = this.then;
        this.cpu.loadSpritesIntoMemory();
        this.cpu.loadRom(rom_game);
        this.rom_game = rom_game;
        this.loop = requestAnimationFrame(() => this.step);
    }
}
exports.CHIP8 = CHIP8;
//# sourceMappingURL=chip8.js.map