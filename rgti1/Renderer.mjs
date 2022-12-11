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
        const m2 = Matrix.multiply(Matrix.perspective(camera.perspective), m1);
        const m3 = Matrix.multiply(Matrix.viewport(0,0,width,height), m2);
            
        // Get all vertices and draw    - TRS <- TRzRyRxS
        for (let i = 0; i < model.vertices.length; i+=3) {
            const vxs = model.vertices;

            // Get vertex coordinates
            const vertex = [vxs[i], vxs[i+1], vxs[i+2], 1]     
            
            // Transform
            const m4 = Matrix.transform(m3, vertex);

            // Normalize
            for (let i in m4) {
                m4[i] *= camera.perspective / m4[2] ;
            }
            
            vertices.push(m4);
        }

        for (let i = 0; i < model.indices.length; i+=3) {
            //console.log(vertices[ix], vertices[ix+1], vertices[ix+2])
            console.log("Drawing", vertices[model.indices[i]], vertices[model.indices[i+1]], vertices[model.indices[i+2]])

            this.drawTriangle(vertices[model.indices[i]], vertices[model.indices[i+1]], vertices[model.indices[i+2]])
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
