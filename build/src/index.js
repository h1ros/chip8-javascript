"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chip8_js_1 = require("./scripts/chip8.js");
window.chip8 = new chip8_js_1.CHIP8();
function selectRom() {
    let select = document.querySelector('#select-rom option:checked');
    if (select) {
        let optGroup = select.parentElement;
        let romType = optGroup === null || optGroup === void 0 ? void 0 : optGroup.label;
        switchInstuction(`./${romType}/${select.value}.txt`);
        window.chip8.init(`./${romType}/${select === null || select === void 0 ? void 0 : select.value}.ch8`);
    }
    let choices = document.querySelector("input[type=checkbox]");
    if (choices) {
        choices.disabled = false;
        choices.checked = true;
    }
    let selectBox = document.querySelector('select');
    if (selectBox) {
        selectBox.blur();
    }
}
function switchInstuction(filePath) {
    console.log(`filePath:  ${filePath}`);
    const instructionsDisplay = document.querySelector('.instructions');
    var f = new XMLHttpRequest();
    f.open("GET", `./roms/${filePath}`, true);
    f.onloadend = function () {
        if (f.readyState === 4) {
            if (f.status === 200 || f.status == 0) {
                if (instructionsDisplay) {
                    instructionsDisplay.textContent = f.responseText;
                }
            }
            else {
                const instructionsDisplay = document.querySelector('.instructions');
                if (instructionsDisplay) {
                    instructionsDisplay.textContent = "No instruction";
                }
            }
        }
    };
    f.onerror = function () {
    };
    f.send();
}
function switchCpu() {
    let runSwitch = document.querySelector("input[type=checkbox]");
    if (runSwitch === null || runSwitch === void 0 ? void 0 : runSwitch.checked) {
        console.log("Checkbox is checked..");
        console.log(window);
        window.chip8.cpu.paused = false;
    }
    else {
        console.log("Checkbox is not checked..");
        window.chip8.cpu.paused = true;
    }
}
let runSwitch = document.querySelector("input[type=checkbox]");
if (runSwitch) {
    runSwitch.addEventListener("change", switchCpu);
}
let selectRomBox = document.querySelector('select');
if (selectRomBox) {
    selectRomBox.addEventListener('change', selectRom.bind(this));
}
//# sourceMappingURL=index.js.map