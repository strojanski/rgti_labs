import * as Matrix from './Matrix.mjs';
export class Node {

    constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    get forwardTransform() {
        let m1 = (Matrix.multiply(Matrix.rotationX(this.rotation[0]), Matrix.scale(this.scale[0], this.scale[1], this.scale[2])));
        let m2 = Matrix.multiply(Matrix.rotationY(this.rotation[1]), m1);
        let m3 = Matrix.multiply(Matrix.rotationZ(this.rotation[2]), m2);
        let m4 = Matrix.multiply(Matrix.translation(this.translation[0], this.translation[1], this.translation[2]), m3);

        return m4;
    }
    // TODO - get actual inverse matrices not just opposite order of operations
    get inverseTransform() {
        // (TRS)^-1 = S^-1 R^-1 T^-1
        const iT = Matrix.translation(-1 * this.translation[0], -1 * this.translation[1], -1 * this.translation[2]);
        const iRx = Matrix.rotationX(-1 * this.rotation[0]);
        const iRy = Matrix.rotationY(-1 * this.rotation[1]);
        const iRz = Matrix.rotationZ(-1 * this.rotation[2])
        const Si = Matrix.scale(1/this.scale[0], 1/this.scale[1], 1/this.scale[2]);

        const m1 = Matrix.multiply(iRx, iT);
        const m2 = Matrix.multiply(iRy, m1);
        const m3 = Matrix.multiply(iRz, m2);
        const m4 = Matrix.multiply(Si, m3);

        return m4;
    }
}
