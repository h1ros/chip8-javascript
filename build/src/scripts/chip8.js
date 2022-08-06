"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHIP8 = void 0;
var renderer_js_1 = require("./renderer.js");
var keyboard_js_1 = require("./keyboard.js");
var speaker_js_1 = require("./speaker.js");
var cpu_js_1 = require("./cpu.js");
var CHIP8 = /** @class */ (function () {
    function CHIP8() {
        var _this = this;
        this.step = function () {
            _this.elapsed = Date.now() - _this.then;
            if (_this.elapsed > _this.fpsInterval && !_this.cpu.paused) {
                // Cycle the CPU
                _this.cpu.cycle();
                _this.then = Date.now();
            }
            _this.loop = requestAnimationFrame(_this.step);
        };
        console.log('CHIP8 is constructed');
        var fps = 60;
        this.fpsInterval = 1000 / fps;
        var renderer = new renderer_js_1.default(10);
        var keyboard = new keyboard_js_1.default();
        var speaker = new speaker_js_1.default();
        var cpu = new cpu_js_1.default(renderer, keyboard, speaker);
        this.cpu = cpu;
    }
    CHIP8.prototype.init = function (rom_game) {
        var _this = this;
        this.then = Date.now();
        this.startTime = this.then;
        this.cpu.loadSpritesIntoMemory();
        this.cpu.loadRom(rom_game);
        this.rom_game = rom_game;
        this.loop = requestAnimationFrame(function () { return _this.step; });
    };
    return CHIP8;
}());
exports.CHIP8 = CHIP8;
