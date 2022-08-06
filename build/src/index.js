"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chip8_js_1 = require("./scripts/chip8.js");
window.chip8 = new chip8_js_1.CHIP8();
function selectRom() {
    var select = document.querySelector('#select-rom option:checked');
    var romType = select.parentElement.label;
    console.log('this within selectRom:', this);
    window.chip8.init("./".concat(romType, "/").concat(select.value, ".ch8"));
    document.querySelector("input[type=checkbox]").disabled = false;
    document.querySelector("input[type=checkbox]").checked = true;
    document.querySelector('select').blur();
    switchInstuction("./".concat(romType, "/").concat(select.value, ".txt"));
}
function switchInstuction(filePath) {
    console.log("filePath:  ".concat(filePath));
    var instructionsDisplay = document.querySelector('.instructions');
    var f = new XMLHttpRequest();
    f.open("GET", "./roms/".concat(filePath), true);
    f.onloadend = function () {
        if (f.readyState === 4) {
            if (f.status === 200 || f.status == 0) {
                instructionsDisplay.textContent = f.responseText;
            }
            else {
                var instructionsDisplay_1 = document.querySelector('.instructions');
                instructionsDisplay_1.textContent = "No instruction";
            }
        }
    };
    f.onerror = function () {
    };
    f.send();
}
function switchCpu() {
    if (this.checked) {
        console.log("Checkbox is checked..");
        console.log(window);
        window.chip8.cpu.paused = false;
    }
    else {
        console.log("Checkbox is not checked..");
        window.chip8.cpu.paused = true;
    }
}
document.querySelector("input[type=checkbox]").addEventListener("change", switchCpu);
document.querySelector('select').addEventListener('change', selectRom.bind(this));
