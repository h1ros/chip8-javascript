
export {};

declare global {
  type CHIP8 = import('../scripts/chip8').CHIP8;
  interface Window {
    chip8: CHIP8;
  }
}