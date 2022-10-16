import * as Matrix from './Matrix.mjs';

export class Node {

    constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    get forwardTransform() {
        // TODO: implement
    }

    get inverseTransform() {
        // TODO: implement
    }

}
