import Renderer from './renderer.js';
import Keyboard from './keyboard.js';
import Speaker from './speaker.js';

class CPU {
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

    constructor(renderer: Renderer, keyboard: Keyboard, speaker: Speaker){
        console.log('CPU is constructed')
        this.renderer = renderer;
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

        this.renderer.clear()

        this.loadSpritesIntoMemory()

    }

    reset(){
        // Memory
        this.memory = new Uint8Array(4096);
        this.loadSpritesIntoMemory()

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

        this.paused = true;

        this.renderer.clear()
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

    loadProgramIntoMemory(program: Uint8Array){
        for (let loc=0; loc < program.length; loc++){
            this.memory[0x200 + loc] = program[loc]
        }
        this.paused = false
    }

    loadRom(romName: string){
        var request = new XMLHttpRequest();
        var self = this; request;

        request.onload = function(){
            if (request.response) {
                let program = new Uint8Array(request.response);

                self.loadProgramIntoMemory(program);
            }
        }
        request.open('GET', 'roms/' + romName);
        request.responseType = 'arraybuffer';

        request.send();
        console.log(`loaded ROM: ${romName}`);
    }

    cycle(){
        for (let i = 0; i < this.speed; i++){
            if (!this.paused){
                console.log("opcode ", this.memory[this.pc].toString(16), this.memory[this.pc+1].toString(16))

                let opcode = (this.memory[this.pc] << 8 | this.memory[this.pc + 1]);
                this.executeInstruction(opcode);
            }
        }
        if (!this.paused){
            this.updateTimers();
        }
        this.playSound();
        this.renderer.render();

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

    executeInstruction(opcode: number){
        this.pc += 2;
        let x = (opcode & 0x0F00) >> 8;
        let y = (opcode & 0x00F0) >> 4;
        console.log("x: ", x, "y: ", y)
        switch (opcode & 0xF000) {
            case 0x0000:
                switch (opcode) {
                    case 0x00E0:
                        this.renderer.clear();
                        break;
                    case 0x00EE:
                        let pc = this.stack.pop()
                        if (pc){
                            this.pc = pc;
                        } else {
                            console.error('pc is undefined')
                        }
                        break;
                }
                break;
            case 0x1000:
                this.pc = (opcode & 0xFFF);
                break;
            case 0x2000:
                this.stack.push(this.pc);
                this.pc = (opcode & 0xFFF);
                break;
            case 0x3000:
                if (this.v[x] === (opcode & 0xFF)){
                    this.pc += 2
                }
                break;
            case 0x4000:
                if (this.v[x] !== (opcode & 0xFF)){
                    this.pc += 2
                }
                break;
            case 0x5000:
                if (this.v[x] === this.v[y]){
                    this.pc += 2;
                }
                break;
            case 0x6000:
                this.v[x] = (opcode & 0xFF);
                break;
            case 0x7000:
                this.v[x] += (opcode & 0xFF);
                break;
            case 0x8000:
                switch (opcode & 0xF) {
                    case 0x0:
                        this.v[x] = this.v[y]
                        break;
                    case 0x1:
                        this.v[x] |= this.v[y]
                        break;
                    case 0x2:
                        this.v[x] &= this.v[y]
                        break;
                    case 0x3:
                        this.v[x] ^= this.v[y]
                        break;
                    case 0x4:
                        let sum = (this.v[x] += this.v[y]);
                        this.v[0xF] = 0;

                        if (sum > 0xFF) {
                            this.v[0xF] = 1;
                        }

                        this.v[x] = sum;
                        break;
                    case 0x5:
                        this.v[0xF] = 0;

                        if (this.v[x] > this.v[y]) {
                            this.v[0xF] = 1;
                        }
                        this.v[x] -= this.v[y];
                        break;
                    case 0x6:
                        this.v[0xF] = (this.v[x] & 0x1);
                        this.v[x] >>= 1;
                        break;
                    case 0x7:
                        this.v[0xF] = 0;

                        if (this.v[y] > this.v[x]){
                            this.v[0xF] = 1;
                        }
                        this.v[x] = this.v[y] - this.v[x];
                        break;
                    case 0xE:
                        this.v[0xF] = (this.v[x] & 0x80);
                        this.v[x] <<= 1;
                        break;
                }
                break;
            case 0x9000:
                if (this.v[x] !== this.v[y]){
                    this.pc += 2;
                }
                break;
            case 0xA000:
                this.i = (opcode & 0xFFF);
                break;
            case 0xB000:
                this.pc = (opcode & 0xFFF) + this.v[0]
                break;
            case 0xC000:
                let rand = Math.floor(Math.random() * 0xFFFF);
                this.v[x] = rand& (opcode & 0xFF);
                break;
            case 0xD000:
                this.draw(x, y, opcode & 0xF);
                break;
            case 0xE000:
                switch (opcode & 0xFF) {
                    case 0x9E:
                        if (this.keyboard.isKeyPressed(this.v[x])){
                            this.pc += 2
                        }
                        break;
                    case 0xA1:
                        if (!this.keyboard.isKeyPressed(this.v[x])){
                            this.pc += 2
                        }
                        break;
                }
                break;
            case 0xF000:
                switch (opcode & 0xFF) {
                    case 0x07:
                        this.v[x] = this.delayTimer;
                        break;
                    case 0x0A:
                        console.log(`Waiting for key press`)
                        this.paused = true;
                        this.keyboard.onNextKeyPress = function(this: CPU, key: number){
                            console.log(`onNextKeyPress: v[x]: ${this.v[x]} x: ${x}, key: ${key}`)
                            this.v[x] = key;
                            this.paused = false;
                        }.bind(this);
                        break;
                    case 0x15:
                        this.delayTimer = this.v[x];
                        break;
                    case 0x18:
                        this.soundTimer = this.v[x];
                        break;
                    case 0x1E:
                        this.i += this.v[x];
                        break;
                    case 0x29:
                        this.i = this.v[x] * 5;
                        break;
                    case 0x33:
                        this.memory[this.i] = Math.floor(this.v[x] / 100);
                        this.memory[this.i + 1] =  Math.floor(this.v[x] % 100) / 10;
                        this.memory[this.i + 2] =  Math.floor(this.v[x] % 10);
                        break;
                    case 0x55:
                        for (let registerIndex = 0; registerIndex <= x; registerIndex++){
                            this.memory[this.i + registerIndex] = this.v[registerIndex];
                        }
                        break;
                    case 0x65:
                        for (let registerIndex = 0; registerIndex <= x; registerIndex++){
                            this.v[registerIndex] = this.memory[this.i + registerIndex];
                        }
                        break;
                }

                break;

            default:
                throw new Error('Unknown opcode ' + opcode);
        }


    }

    draw(x: number, y: number, N: number){
        let width = 8;

        this.v[0xF] = 0;
        console.log('draw(Vx, Vy): ', this.v[x], this.v[y])
        for (let row = 0; row < N; row++){
            let sprite = this.memory[this.i + row];
            console.log('draw (', row,'): ', sprite.toString(2).padStart(8, '0').replaceAll('1', '■').replaceAll('0', '□'))
            for (let col = 0; col < width; col ++){
                if ((sprite & 0x80) > 0){
                    if (this.renderer.setPixel(this.v[x] + col, this.v[y] + row)){
                        this.v[0xF] = 1;
                    }
                }
                sprite <<= 1;
            }
        }
    }
}

export default CPU;