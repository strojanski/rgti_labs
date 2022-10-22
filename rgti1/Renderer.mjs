import * as Matrix from './Matrix.mjs';

export class Renderer {

    constructor(context) {
        this.context = context;
        this.centerOffset = 200
    }

    render(camera, model) {
        const { width, height } = this.context.canvas;
        this.context.clearRect(0, 0, width, height);
    }

    drawTriangle(v0, v1, v2) {
        //console.log("Drawing triangle from", v0, " to", v1, "to", v2);
        this.context.beginPath();
        this.context.moveTo(...v0);
        this.context.lineTo(...v1);
        this.context.lineTo(...v2);
        this.context.closePath();
        this.context.stroke();
    }

}
