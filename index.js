import {CHIP8} from './scripts/chip8.js';

window.chip8 = new CHIP8();

function selectRom() {
    let select = document.getElementById("select-rom")
    let rom_game = './games/' + select.options[select.selectedIndex].value + '.ch8'
    console.log('loading rom:', rom_game)
    console.log('this within selectRom:', this)
    window.chip8.init(rom_game);
}
document.querySelector('select').addEventListener('change', selectRom.bind(this))
