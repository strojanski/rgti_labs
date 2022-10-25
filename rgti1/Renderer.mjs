import * as Matrix from './Matrix.mjs';

export class Renderer {

    constructor(context) {
        this.context = context;
        this.centerOffset = 200
    }

    render(camera, model) {
        const { width, height } = this.context.canvas;
        this.context.clearRect(0, 0, width, height);
        
        let vertices = [];
        const m1 = Matrix.multiply(camera.inverseTransform, model.forwardTransform);
        //console.log("m1", m1);
        const m2 = Matrix.multiply(Matrix.perspective(camera.perspective), m1);
        //console.log("m2", m2);
        //console.log("m3", m1);

        // Get all vertices and draw    - TRS <- TRzRyRxS
        for (let i = 0; i < model.indices.length; i++) {
            let ix = model.indices[i];
            const m = model.vertices;
            const vertex = [m[ix], m[ix+1], m[ix+2], 1]     
           
            const m4 = Matrix.transform(m2, vertex);
            //console.log("m4", m4);

            for (let i in m4) {
                m4[i] = Math.abs(m4[i]);
            }
            const m3 = Matrix.transform(Matrix.viewport(0,0,512,512), m4);
            
            
            vertices.push(m3);
        }

        for (let i = 0; i < vertices.length-2; i++) {
            for (let j = i; j < vertices.length-1; j++) {
                for (let k = j; k < vertices.length; k++) {
                    this.drawTriangle(vertices[i], vertices[j], vertices[k])
                }
            }
        }

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
