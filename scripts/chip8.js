import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';

class CHIP8 {
    constructor(){
        console.log('CHIP8 is constructed')
    }

    init(rom_game) {
        const renderer = new Renderer(10);
        const keyboard = new Keyboard();
        const speaker = new Speaker();
        const cpu = new CPU(renderer, keyboard, speaker);
        let fps = 60
        this.cpu = cpu;
        this.fpsInterval = 1000 / fps;

        this.then = Date.now();
        this.startTime = this.then;
        this.cpu.loadSpritesIntoMemory();
        this.cpu.loadRom(rom_game);
        this.rom_game = rom_game
        this.loop = requestAnimationFrame(this.step);
    }

    step = () => {
        this.elapsed = Date.now() - this.then;
        if (this.elapsed > this.fpsInterval && !this.cpu.paused) {
                // Cycle the CPU
                this.cpu.cycle();
                this.then = Date.now();
        }
        this.loop = requestAnimationFrame(this.step);

    }
}

export {CHIP8};