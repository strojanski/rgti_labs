import * as Matrix from './Matrix.mjs';

export class Node {

    constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    get forwardTransform() {
        let m1 = (Matrix.multiply(Matrix.rotationX(this.rotation[0]), Matrix.scale(this.scale[0]), this.scale[1], this.scale[2]));
        let m2 = Matrix.multiply(Matrix.rotationY(this.rotation[1]), m1);
        let m3 = Matrix.multiply(Matrix.rotationZ(this.rotation[2]), m2);
        let m4 = Matrix.multiply(Matrix.translation(this.translation[0], this.translation[1], this.translation[2]), m3);

        return m4;
    }

    get inverseTransform() {
        let m1 = Matrix.multiply(Matrix.rotationZ(-this.rotation[2]), Matrix.translation(-this.translation[0], -this.translation[1], -this.translation[2]));
        let m2 = Matrix.multiply(Matrix.rotationY(-this.rotation[1]), m1);
        let m3 = Matrix.multiply(Matrix.rotationX(-this.rotation[0]), m2);
        let m4 = Matrix.multiply(Matrix.scale(-this.scale[0], -this.scale[1], -this.scale[2]), m3);

        return m4;
    }
}
