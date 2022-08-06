"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        console.log('Keyboard is constructed');
        this.KEYMAP = {
            49: 0x1,
            50: 0x2,
            51: 0x3,
            52: 0xc,
            81: 0x4,
            87: 0x5,
            69: 0x6,
            82: 0xD,
            65: 0x7,
            83: 0x8,
            68: 0x9,
            70: 0xE,
            90: 0xA,
            88: 0x0,
            67: 0xB,
            86: 0xF // V
        };
        this.keysPressed = {};
        this.onNextKeyPress = null; //
        window.addEventListener("keydown", this.onKeyDown.bind(this), false);
        window.addEventListener("keyup", this.onKeyUp.bind(this), false);
    }
    Keyboard.prototype.isKeyPressed = function (keyCode) {
        console.log('keyCode: ', keyCode);
        return this.keysPressed[keyCode];
    };
    Keyboard.prototype.onKeyDown = function (event) {
        var key = this.KEYMAP[event.which];
        console.log('down key: ', key);
        this.keysPressed[key] = true;
        if (this.onNextKeyPress !== null && key) {
            this.onNextKeyPress(parseInt());
            this.onNextKeyPress = null;
        }
    };
    Keyboard.prototype.onKeyUp = function (event) {
        console.log('onKeyUp event', event);
        var key = this.KEYMAP[event.which];
        console.log('up key: ', key);
        this.keysPressed[key] = false;
    };
    return Keyboard;
}());
exports.default = Keyboard;
