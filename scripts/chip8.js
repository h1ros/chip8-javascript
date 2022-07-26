import Renderer from './rederer.js';
import Keyboard from './keyboard.js';
import Spaker from './speaker.js';
const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();

let loop;

let fps = 60, fpsInterval, startTime, now, then, elapsed;

function init() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    renderer.testRender();
    renderer.render();
    loop = requestAnimationFrame(step);
}

function step(){
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        // Cycle the CPU
    }
    loop = requestAnimationFrame(step);
}


init();