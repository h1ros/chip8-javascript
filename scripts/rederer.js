class Renderer {
    constructor (scale) {
        this.cols = 64;
        this.rows = 32;

        this.scale = scale;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.colrows * this.scale;

        this.display = new Array(this.cols * this.rows);
    }
}
export default Renderer;