import CPU from './cpu.js';
declare class CHIP8 {
    fpsInterval: number;
    cpu: CPU;
    then: number;
    startTime: number;
    rom_game: string;
    loop: number;
    elapsed: number;
    constructor();
    init(rom_game: string): void;
    step: () => void;
}
export { CHIP8 };
