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
            const nxs = model.normals;

            // Get vertex coordinates
            const vertex = [vxs[i], vxs[i+1], vxs[i+2], 1]  
            const normal = [nxs[i], nxs[i+1], nxs[i+2], 1] 
            const color = this.phong(vertex, normal, model.lights, model.material[0])
            console.log("color", color)

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
            //console.log("Drawing", vertices[model.indices[i]], vertices[model.indices[i+1]], vertices[model.indices[i+2]])
            this.drawTriangle(vertices[model.indices[i]], vertices[model.indices[i+1]], vertices[model.indices[i+2]])
        }
    }

    phong(vertex, normal, lights, material) {
        let res = [0,0,0]
        for (const l in lights) {
            const light = lights[l];
            const li = [light.position[0] - vertex[0], light.position[1] - vertex[1], light.position[2] - vertex[2]]
            const liNormalized = this.normalize(li)
            let li_n = this.dot(liNormalized, normal)
            
            if (li_n < 0) li_n = 0

            // Get R
            const r = this.add_subtract(liNormalized, this.vectorScalar(2 * this.dot(liNormalized, normal), normal)) 
            const e = [-vertex[0], -vertex[1], -vertex[2]]
            const e_norm = this.normalize(e)

            //const kdlin = (li_n * material.shininess)
            //const ksrie = 

            const lin = li_n
            const riep = this.dot(r, e_norm)**material.shininess

            const mid_res = lin + riep
            const to_add = this.vectorScalar(mid_res, light.color)
            for (const i in res) {
                res[i] += to_add[i]
            }
        }
        
        return [res[0] *  material.color[0], res[1] *  material.color[1], res[2] *  material.color[2]]  
    }

    dot(vec31, vec32) {
        let res = 0
        for (const c in vec31) {
            res += vec31[c] * vec32[c]
        }
        return res
    }

    add_subtract(vec31, vec32, add=true) {
        let res = [0,0,0];
        for (const i in vec31) {
            let x1 = vec31[i]
            let x2 = vec32[i]
            if (add) {
                res[i] = x1 + x2
            } else {
                res[i] = x1 - x2
            }
        }
        return res;
    }

    vectorScalar(scalar, vec3) {
        let res = [0,0,0]
        for (let i = 0; i < res.length; i++) {
            res[i] = vec3[i] * scalar;
        }
        return res;
    }

    normalize(vec3) {
        let len = 0;
        for (const c in vec3) {
            len += vec3[c]**2
        }
        for (const c in vec3) {
            vec3[c] /= len
        }
        return vec3
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
