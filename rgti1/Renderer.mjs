import * as Matrix from './Matrix.mjs';

export class Renderer {

    constructor(context) {
        console.log("RENDERER")
        this.context = context;
        this.centerOffset = 200
    }

    render(camera, model) {
        const { width, height } = this.context.canvas;
        this.context.clearRect(0, 0, width, height);

        let translation_matrix = Matrix.translation(model.translation[0], model.translation[1], model.translation[2])
        let scale_matrix = Matrix.scale(model.scale[0], model.scale[1], model.scale[2])

        console.log(translation_matrix, scale_matrix)

        Matrix.multiply(scale_matrix, translation_matrix)
        console.log(model.vertices)

        const vertices = [];
        for (const index in model.indices) {
            const actual_index = 3 * model.indices[index];
            let v = [];
            for (let i = 0; i < 3; i++) {
                v.push(this.centerOffset + model.vertices[actual_index + i]*100)
            }
            vertices.push(v);
        }
        console.log(vertices)
        
        for (let i = 0; i < vertices.length-2; i++) {
            for (let j = 1; j < vertices.length-1; j++) {
                for (let k = 2; k < vertices.length; k++) {
                    this.drawTriangle(vertices[i], vertices[j], vertices[k])
                }
            }
        }

    }

    drawTriangle(v0, v1, v2) {
        console.log("Drawing triangle from", v0, " to", v1, "to", v2);
        this.context.beginPath();
        
        //this.context.moveTo(200, 200);
        //this.context.lineTo(400, 400);
        this.context.moveTo(v0[0], v0[1]);
        this.context.lineTo(v1[0], v1[1]);
        this.context.lineTo(v2[0], v2[1]);
        this.context.closePath();
        this.context.stroke();
    }

}
