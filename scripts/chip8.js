import Renderer from './rederer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
import CPU from './cpu.js';
const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);
let loop;

let fps = 60, fpsInterval, startTime, now, then, elapsed;

function init() {
    fpsInterval = fps;
    then = Date.now();
    startTime = then;

    cpu.loadSpritesIntoMemory();
    cpu.loadRom('../roms/programs/Keypad Test [Hap, 2006].ch8');
    loop = requestAnimationFrame(step);
}

function step(){
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        // Cycle the CPU
        cpu.cycle();
        then = Date.now();
    }

    loop = requestAnimationFrame(step);

}


init();