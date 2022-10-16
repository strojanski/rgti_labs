export function multiply(a, b) {

    let res = [];
    for (let i = 0; i < a.length; i++) {
        res[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            res[i][j] = 0;
            for (let k = 0; k < a[0].length; k++) {
                res[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return res;
}

export function transform(a, v) {

    // TODO: implement
}

export function identity() {
    return [[1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]]
}

export function translation(dx, dy, dz) {
    return [[1,0,0,dx],
            [0,1,0,dy],
            [0,0,1,dz],
            [0,0,0,1]]
}

export function scale(sx, sy, sz) {
    return [[sx,0,0,0],
            [0,sy,0,0],
            [0,0,sz,0],
            [0,0,0,1]]
}

export function rotationX(angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return [[1,0,0,0],
            [0,cos,-sin,0],
            [0,sin,cos,0],
            [0,0,0,1]]
}

export function rotationY(angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return [[cos, 0, sin, 0],
            [0,   1, 0,   0],
            [-sin,0, cos, 0],
            [0,   0, 0,   1]]
}

export function rotationZ(angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return [[cos, -sin, 0, 0],
            [sin, cos,  0, 0],
            [0,   0,    1, 0],
            [0,   0,    0, 1]]
}

export function perspective(d) {
    // TODO: implement
}

export function viewport(x, y, w, h) {
    // TODO: implement
}
