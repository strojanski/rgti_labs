// DELAM
export function multiply(a, b) {

    let res = [];
    for (let i = 0; i < a.length; i++) {
        res[i] = [0, 0, 0, 0];
        for (let j = 0; j < b[0].length; j++) {
            res[i][j] = 0;
            for (let k = 0; k < a[0].length; k++) {
                res[i][j] += a[i][k] * b[k][j];
                if (isNaN(res[i][j])) {
                    console.log(a, b);
                }
            }
        }
    }
    console.log(res)
    return res;
}

export function transform(a, v) {
    let res = [0, 0, 0, 0];
    console.log(a, v)
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < v.length; j++) {
            res[i] += a[i][j] * v[j];
        }
    }
    return res;
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
            [0,cos,-1*sin,0],
            [0,sin,cos,0],
            [0,0,0,1]]
}

export function rotationY(angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return [[cos, 0, sin, 0],
            [0,   1, 0,   0],
            [-1*sin,0, cos, 0],
            [0,   0, 0,   1]]
}

export function rotationZ(angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return [[cos, -1*sin, 0, 0],
            [sin, cos,  0, 0],
            [0,   0,    1, 0],
            [0,   0,    0, 1]]
}

export function perspective(d) {
    // TODO: implement
    return [[1,0,0,  0],
            [0,1,0,  0],
            [0,0,1,  0],
            [0,0,1/d,0]]
}

// [-1, -1] x [1, 1] -> [x, y] x [x+h, y+w]
export function viewport(x, y, w, h) {
    // scale x216
    // transform to (0, 0)
    return multiply(translation(w/2, -h/2, 0), scale(w/2, h/2, 1))

}
