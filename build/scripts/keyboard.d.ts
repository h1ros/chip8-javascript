declare class Keyboard {
    KEYMAP: {
        [key: number]: number;
    };
    keysPressed: {
        [key: string]: boolean;
    };
    onNextKeyPress: null | Function;
    constructor();
    isKeyPressed(keyCode: number): boolean;
    onKeyDown(event: KeyboardEvent): void;
    onKeyUp(event: KeyboardEvent): void;
}
export default Keyboard;
