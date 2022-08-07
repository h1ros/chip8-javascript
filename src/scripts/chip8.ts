import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';

class CHIP8 {
    fpsInterval: number;
    cpu: CPU
    then!: number;
    startTime!: number;
    rom_game!: string;
    loop!: number;
    elapsed!: number;

    constructor(){
        console.log('CHIP8 is constructed')
        let fps = 60
        this.fpsInterval = 1000 / fps;
        const renderer = new Renderer(10);
        const keyboard = new Keyboard();
        const speaker = new Speaker();
        const cpu = new CPU(renderer, keyboard, speaker);
        this.cpu = cpu;
    }

    init() {
        this.then = Date.now();
        this.startTime = this.then;
        this.cpu.reset();
    }

    loadRom(rom_game: string) {
        console.log(`loading ROM: ${rom_game}`);
        this.then = Date.now();
        this.startTime = this.then;
        this.cpu.loadRom(rom_game);
        this.rom_game = rom_game
        this.loop = requestAnimationFrame(this.step);
        console.log(`this.loop: ${this.loop}`);
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