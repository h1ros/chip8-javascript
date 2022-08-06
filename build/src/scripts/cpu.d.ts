import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';
declare class CPU {
    memory: Uint8Array;
    delayTimer: number;
    soundTimer: number;
    i: number;
    pc: number;
    stack: Array<number>;
    v: Uint8Array;
    paused: boolean;
    speed: number;
    renderer: Renderer;
    keyboard: Keyboard;
    speaker: Speaker;
    constructor(renderer: Renderer, keyboard: Keyboard, speaker: Speaker);
    loadSpritesIntoMemory(): void;
    loadProgramIntoMemory(program: Uint8Array): void;
    loadRom(romName: string): void;
    cycle(): void;
    updateTimers(): void;
    playSound(): void;
    executeInstruction(opcode: number): void;
    draw(x: number, y: number, N: number): void;
}
export default CPU;
