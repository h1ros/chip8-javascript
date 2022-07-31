import {CHIP8} from './scripts/chip8.js';

window.chip8 = new CHIP8();

function selectRom() {
    let select = document.querySelector('#select-rom option:checked')
    let rom_type =  select.parentElement.label
    let rom_name = select.value + '.ch8'
    console.log('loading rom:', rom_name)
    console.log('this within selectRom:', this)
    window.chip8.init('./' + rom_type + '/' + rom_name);
    document.querySelector("input[type=checkbox]").disabled = false;
    document.querySelector("input[type=checkbox]").checked = true;
    document.querySelector('select').blur();
}

function switchCpu(){
    if (this.checked) {
        console.log("Checkbox is checked..");
        console.log(window)
        window.chip8.cpu.paused = false;

      } else {
        console.log("Checkbox is not checked..");
        window.chip8.cpu.paused = true;
      }
}

document.querySelector("input[type=checkbox]").addEventListener("change", switchCpu);
document.querySelector('select').addEventListener('change', selectRom.bind(this))
