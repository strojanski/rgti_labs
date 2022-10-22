import * as Matrix from './Matrix.mjs';

export class Renderer {

    constructor(context) {
        this.context = context;
        this.centerOffset = 200
    }

    render(camera, model) {
        const { width, height } = this.context.canvas;
        this.context.clearRect(0, 0, width, height);
        console.log(model)


        // Get all pairs of vertices and draw
        for (let i = 0; i < model.vertices.length/3-2; i+=2) {
            for (let j = i+2; j < model.vertices.length/3-1; j+=2) {
                for (let k = j+2; k < model.vertices.length/3; k+=2) {
                    const m = model.vertices;
                    const v0 = [m[i], m[i+1]]
                    const v1 = [m[j], m[j+1]];
                    const v2 = [m[k], m[k+1]];
                    console.log(i, j, k);
                    this.drawTriangle(v0, v1, v2);
                }
            }
        }

    }

    drawTriangle(v0, v1, v2) {
        console.log("Drawing triangle from", v0, " to", v1, "to", v2);
        this.context.beginPath();
        this.context.moveTo(...v0);
        this.context.lineTo(...v1);
        this.context.lineTo(...v2);
        this.context.closePath();
        this.context.stroke();
    }

}
