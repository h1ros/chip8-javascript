class CPU {
    constructor(renderer, keyboard, speaker){
        this.rederer = renderer;
        this.keyboard = keyboard;
        this.speaker = speaker;

        // Memory
        this.memory = new Uint8Array(4096);

        // 16 8-bit registers
        this.v = new Uint8Array(16);

        // memory address
        this.i = 0

        // Timers
        this.delayTimer = 0;
        this.soundTimer = 0;

        // Program counter CPU
        this.pc = 0x200

        // stack
        this.stack = new Array();

        this.paused = false;
        this.speed = 10;

    }
}

export default CPU;