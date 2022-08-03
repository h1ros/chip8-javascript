import {CHIP8} from './scripts/chip8.js';

window.chip8 = new CHIP8();

function selectRom() {
    let select = document.querySelector('#select-rom option:checked')
    let romType =  select.parentElement.label
    console.log('this within selectRom:', this)
    window.chip8 = new CHIP8();
    window.chip8.init(`./${romType}/${select.value}.ch8`);
    document.querySelector("input[type=checkbox]").disabled = false;
    document.querySelector("input[type=checkbox]").checked = true;
    document.querySelector('select').blur();
    switchInstuction(`./${romType}/${select.value}.txt`)
}

function switchInstuction(filePath) {
  console.log(`filePath:  ${filePath}`)
  const instructionsDisplay = document.querySelector('.instructions')


  var f = new XMLHttpRequest();
  f.open("GET", `./roms/${filePath}`, true);
  f.onloadend = function ()
  {
      if(f.readyState === 4)
      {
          if(f.status === 200 || f.status == 0)
          {
              instructionsDisplay.textContent = f.responseText;
          }
          else {
            const instructionsDisplay = document.querySelector('.instructions');
            instructionsDisplay.textContent = "No instruction";
          }
      }
  }
  f.onerror = function(){

  };
  f.send();
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
