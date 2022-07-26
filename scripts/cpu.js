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

    loadSpritesIntoMemory(){

        const sprites = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];

        for (let i = 0; i < sprites.length; i++) {
            this.memory[i] = sprites[i]
        }

    }

    loadProgramIntoMemory(program){
        for (let loc=0; loc < program.length; loc++){
            this.memory[0x200 + loc] = program[loc]
        }
    }

    loadRom(romName){
        var request = new XMLHttpRequest();
        var self = this; request;

        request.onload = function(){
            if (request.response) {
                let program = new Uint8Array(request.response);

                sefl.loadProgramIntoMemory(program);
            }
        }
        request.open('GET', 'roms/' + romName);
        request.responseType = 'arraybuffer';

        request.send();

    }

    cycle(){
        for (let i = 0; i < this.speed; i++){
            if (!this.paused){
                let opcode = (this.memory[this.pc] << 8 | this.memory[this.pc + 1]);
                this.executeInstruction(opcode);
            }
        }
        if (!this.paused){
            this.updateTimers();
        }
        this.playSound();
        this.rederer.render();

    }
    updateTimers(){
        if (this.delayTimer > 0){
            this.delayTimer -= 1;
        }
        if (this.soundTimer > 0){
            this.soundTimer -= 1;
        }
    }
    playSound(){
        if (this.soundTimer > 0){
            this.speaker.play(440);
        } else {
            this.speaker.stop();
        }
    }

    executeInstruction(opcode){
        this.pc += 2;
    }
}

export default CPU;