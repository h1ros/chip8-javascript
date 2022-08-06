declare class Renderer {
    cols: number;
    rows: number;
    scale: number;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    display: Array<number>;
    constructor(scale: number);
    setPixel(x: number, y: number): boolean;
    clear(): void;
    render(): void;
    testRender(): void;
}
export default Renderer;
