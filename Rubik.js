//export const C = { b: 'blue', r: 'red', g: 'green', o: 'orange', y: 'yellow', w: 'white', p: 'pink' };
export const C = { l: 'green', f: 'orange', r: 'blue', b: 'red', u: 'yellow', d: 'white' };
const FACES = { left: 1, front: 2, right: 3, back: 4, up: 5, down: 6 };
export const F = { l: 1, f: 2, r: 3, b: 4, u: 5, d: 6 };
export const M = { l: 1, f: 2, r: 3, b: 4, u: 5, d: 6, l_: -1, f_: -2, r_: -3, b_: -4, u_: -5, d_: -6 };
// Corners XYZ, where:
// X=0=left; X=1=right
// Y=0=up; Y=1=down
// Z=0=front; Z=1=back
const CC = {
    C000: { Name: 'C000', value: [C.u, C.f, C.l] },
    C001: { Name: 'C001', value: [C.u, C.b, C.l] },
    C010: { Name: 'C010', value: [C.d, C.f, C.l] },
    C011: { Name: 'C011', value: [C.d, C.b, C.l] },
    C100: { Name: 'C100', value: [C.u, C.f, C.r] },
    C101: { Name: 'C101', value: [C.u, C.b, C.r] },
    C110: { Name: 'C110', value: [C.d, C.f, C.r] },
    C111: { Name: 'C111', value: [C.d, C.b, C.r] }
}


const CE = {
    E002: { Name: 'E002', value: [C.l, C.u] },
    E012: { Name: 'E012', value: [C.d, C.l] },
    E020: { Name: 'E020', value: [C.f, C.l] },
    E021: { Name: 'E021', value: [C.b, C.l] },
    E102: { Name: 'E102', value: [C.r, C.u] },
    E112: { Name: 'E112', value: [C.d, C.r] },
    E120: { Name: 'E120', value: [C.f, C.r] },
    E121: { Name: 'E121', value: [C.b, C.r] },
    E200: { Name: 'E200', value: [C.f, C.u] },
    E201: { Name: 'E201', value: [C.b, C.u] },
    E210: { Name: 'E210', value: [C.f, C.d] },
    E211: { Name: 'E211', value: [C.d, C.b] },
}

const FRONTFACE = [CC.C000, CC.C100, CC.C110, CC.C010, CE.E200, CE.E120, CE.E210, CE.E020];


const SOLVED = {
    CORNERS:
        [[[CC.C000, //000
        CC.C001], //001
        [CC.C010, //010
        CC.C011]], //011
        [[CC.C100, //100
        CC.C101], //101
        [CC.C110, //110
        CC.C111]]], //111
    // EDGES XYZ, where:
    // X=0=left; X=1=right
    // Y=0=up; Y=1=down
    // Z=0=front; Z=1=back
    // A 2 is placed where there axis is in the middle, example:
    // Edge between Corner 000 and Corner 100 => 200
    EDGES: [
        [ // 0xx
            [[], [], CE.E002], // 002
            [[], [], CE.E012], // 012
            [CE.E020, CE.E021]], // 020, 021
        [ //1xx
            [[], [], CE.E102], // 102
            [[], [], CE.E112], // 112
            [CE.E120, CE.E121, []]], // 120, 121
        [ //200
            [CE.E200, CE.E201, []], //200, 201
            [CE.E210, CE.E211, []] //210, 211
        ]
    ]
};

const SOLVED_old = {
    CORNERS:
        [[[[C.u, C.f, C.l], //000
        [C.u, C.b, C.l]], //001
        [[C.d, C.f, C.l], //010
        [C.d, C.b, C.l]]], //011
        [[[C.u, C.f, C.r], //100
        [C.u, C.b, C.r]], //101
        [[C.d, C.f, C.r], //110
        [C.d, C.b, C.r]]]], //111
    // EDGES XYZ, where:
    // X=0=left; X=1=right
    // Y=0=up; Y=1=down
    // Z=0=front; Z=1=back
    // A 2 is placed where there axis is in the middle, example:
    // Edge between Corner 000 and Corner 100 => 200
    EDGES: [
        [ // 0xx
            [[], [], [C.l, C.u]], // 002
            [[], [], [C.d, C.l]], // 012
            [[C.f, C.l], [C.b, C.l]]], // 020, 021
        [ //1xx
            [[], [], [C.r, C.u]], // 102
            [[], [], [C.d, C.r]], // 112
            [[C.f, C.r], [C.b, C.r], []]], // 120, 121
        [ //200
            [[C.f, C.u], [C.b, C.u], []], //200, 201
            [[C.f, C.d], [C.d, C.b], []] //210, 211
        ]
    ]
};

export class Rubik {
    constructor(params) {
        this.ctx = params.ctx;
        this.side = params.side;
        this.x0 = params.x;
        this.y0 = params.y;
        this.cube = (params.cube !== null && params.cube.lenght > 0) ? params.cube : SOLVED;
    }

    move(m) {
        switch (m) {
            case 1: {
                var C001 = this.cube.CORNERS[0][0][1];
                this.swap(C001.value, 0, 1);
                var C000 = this.cube.CORNERS[0][0][0];
                this.swap(C000.value, 0, 1);
                var C010 = this.cube.CORNERS[0][1][0];
                this.swap(C010.value, 0, 1);
                var C011 = this.cube.CORNERS[0][1][1];
                this.swap(C011.value, 1, 0);
                var E002 = this.cube.EDGES[0][0][2];
                this.swap(E002.value, 1, 0);
                var E020 = this.cube.EDGES[0][2][0];
                var E012 = this.cube.EDGES[0][1][2];
                var E021 = this.cube.EDGES[0][2][1];
                this.swap(E021.value, 1, 0);

                this.cube.CORNERS[0][0][1] = C011;
                this.cube.CORNERS[0][0][0] = C001;
                this.cube.CORNERS[0][1][0] = C000;
                this.cube.CORNERS[0][1][1] = C010;
                this.cube.EDGES[0][0][2] = E021;
                this.cube.EDGES[0][2][0] = E002;
                this.cube.EDGES[0][1][2] = E020;
                this.cube.EDGES[0][2][1] = E012;
                break;
            };
            case -1: {
                var C001 = this.cube.CORNERS[0][0][1];
                this.swap(C001.value, 0, 1);
                var C000 = this.cube.CORNERS[0][0][0];
                this.swap(C000.value, 0, 1);
                var C010 = this.cube.CORNERS[0][1][0];
                this.swap(C010.value, 0, 1);
                var C011 = this.cube.CORNERS[0][1][1];
                this.swap(C011.value, 1, 0);
                var E002 = this.cube.EDGES[0][0][2];
                this.swap(E002.value, 1, 0);
                var E020 = this.cube.EDGES[0][2][0];
                this.swap(E020.value, 1, 0);
                var E012 = this.cube.EDGES[0][1][2];
                var E021 = this.cube.EDGES[0][2][1];

                this.cube.CORNERS[0][0][1] = C000;
                this.cube.CORNERS[0][0][0] = C010;
                this.cube.CORNERS[0][1][0] = C011;
                this.cube.CORNERS[0][1][1] = C001;
                this.cube.EDGES[0][0][2] = E020;
                this.cube.EDGES[0][2][0] = E012;
                this.cube.EDGES[0][1][2] = E021;
                this.cube.EDGES[0][2][1] = E002;
                break;
            };
            case 2: {
                var C000 = this.cube.CORNERS[0][0][0];
                this.swap(C000.value, 0, 2);
                var C100 = this.cube.CORNERS[1][0][0];
                this.swap(C100.value, 0, 2);
                var C010 = this.cube.CORNERS[0][1][0];
                this.swap(C010.value, 0, 2);
                var C110 = this.cube.CORNERS[1][1][0];
                this.swap(C110.value, 0, 2);
                var E200 = this.cube.EDGES[2][0][0];
                var E020 = this.cube.EDGES[0][2][0];
                var E210 = this.cube.EDGES[2][1][0];
                var E120 = this.cube.EDGES[1][2][0];
                this.cube.CORNERS[0][0][0] = C010;
                this.cube.CORNERS[1][0][0] = C000;
                this.cube.CORNERS[0][1][0] = C110;
                this.cube.CORNERS[1][1][0] = C100;
                this.cube.EDGES[2][0][0] = E020;
                this.cube.EDGES[0][2][0] = E210;
                this.cube.EDGES[2][1][0] = E120;
                this.cube.EDGES[1][2][0] = E200;
                break;
            };
            case -2: {
                var C000 = this.cube.CORNERS[0][0][0];
                this.swap(C000.value, 0, 2);
                var C100 = this.cube.CORNERS[1][0][0];
                this.swap(C100.value, 0, 2);
                var C010 = this.cube.CORNERS[0][1][0];
                this.swap(C010.value, 0, 2);
                var C110 = this.cube.CORNERS[1][1][0];
                this.swap(C110.value, 0, 2);
                var E200 = this.cube.EDGES[2][0][0];
                var E020 = this.cube.EDGES[0][2][0];
                var E210 = this.cube.EDGES[2][1][0];
                var E120 = this.cube.EDGES[1][2][0];
                this.cube.CORNERS[0][0][0] = C100;
                this.cube.CORNERS[1][0][0] = C110;
                this.cube.CORNERS[0][1][0] = C000;
                this.cube.CORNERS[1][1][0] = C010;
                this.cube.EDGES[2][0][0] = E120;
                this.cube.EDGES[0][2][0] = E200;
                this.cube.EDGES[2][1][0] = E020;
                this.cube.EDGES[1][2][0] = E210;
                break;
            };
            case 3: {
                var C101 = this.cube.CORNERS[1][0][1];
                this.swap(C101.value, 0, 1);
                var C100 = this.cube.CORNERS[1][0][0];
                this.swap(C100.value, 0, 1);
                var C110 = this.cube.CORNERS[1][1][0];
                this.swap(C110.value, 0, 1);
                var C111 = this.cube.CORNERS[1][1][1];
                this.swap(C111.value, 1, 0);
                var E102 = this.cube.EDGES[1][0][2];
                this.swap(E102.value, 1, 0);
                var E120 = this.cube.EDGES[1][2][0];
                this.swap(E120.value, 1, 0);
                var E112 = this.cube.EDGES[1][1][2];
                var E121 = this.cube.EDGES[1][2][1];
                this.cube.CORNERS[1][0][1] = C100;
                this.cube.CORNERS[1][0][0] = C110;
                this.cube.CORNERS[1][1][0] = C111;
                this.cube.CORNERS[1][1][1] = C101;
                this.cube.EDGES[1][0][2] = E120;
                this.cube.EDGES[1][2][0] = E112;
                this.cube.EDGES[1][1][2] = E121;
                this.cube.EDGES[1][2][1] = E102;
                break;
            };
            case -3: {
                var C101 = this.cube.CORNERS[1][0][1];
                this.swap(C101.value, 0, 1);
                var C100 = this.cube.CORNERS[1][0][0];
                this.swap(C100.value, 0, 1);
                var C110 = this.cube.CORNERS[1][1][0];
                this.swap(C110.value, 0, 1);
                var C111 = this.cube.CORNERS[1][1][1];
                this.swap(C111.value, 1, 0);
                var E102 = this.cube.EDGES[1][0][2];
                this.swap(E102.value, 1, 0);
                var E120 = this.cube.EDGES[1][2][0];

                var E112 = this.cube.EDGES[1][1][2];
                var E121 = this.cube.EDGES[1][2][1];
                this.swap(E121.value, 1, 0);
                this.cube.CORNERS[1][0][1] = C111;
                this.cube.CORNERS[1][0][0] = C101;
                this.cube.CORNERS[1][1][0] = C100;
                this.cube.CORNERS[1][1][1] = C110;
                this.cube.EDGES[1][0][2] = E121;
                this.cube.EDGES[1][2][0] = E102;
                this.cube.EDGES[1][1][2] = E120;
                this.cube.EDGES[1][2][1] = E112;
                break;
            };
            case 4: {
                var C001 = this.cube.CORNERS[0][0][1];
                this.swap(C001.value, 0, 2);
                var C011 = this.cube.CORNERS[0][1][1];
                this.swap(C011.value, 0, 2);
                var C111 = this.cube.CORNERS[1][1][1];
                this.swap(C111.value, 0, 2);
                var C101 = this.cube.CORNERS[1][0][1];
                this.swap(C101.value, 0, 2);
                var E201 = this.cube.EDGES[2][0][1];
                var E021 = this.cube.EDGES[0][2][1];
                this.swap(E021.value, 0, 1);
                var E211 = this.cube.EDGES[2][1][1];
                this.swap(E211.value, 0, 1);
                var E121 = this.cube.EDGES[1][2][1];
                this.cube.CORNERS[0][0][1] = C101;
                this.cube.CORNERS[0][1][1] = C001;
                this.cube.CORNERS[1][1][1] = C011;
                this.cube.CORNERS[1][0][1] = C111;
                this.cube.EDGES[2][0][1] = E121;
                this.cube.EDGES[0][2][1] = E201;
                this.cube.EDGES[2][1][1] = E021;
                this.cube.EDGES[1][2][1] = E211;
                break;
            };
            case -4: {
                var C001 = this.cube.CORNERS[0][0][1];
                this.swap(C001.value, 0, 2);
                var C011 = this.cube.CORNERS[0][1][1];
                this.swap(C011.value, 0, 2);
                var C111 = this.cube.CORNERS[1][1][1];
                this.swap(C111.value, 0, 2);
                var C101 = this.cube.CORNERS[1][0][1];
                this.swap(C101.value, 0, 2);
                var E201 = this.cube.EDGES[2][0][1];
                var E021 = this.cube.EDGES[0][2][1];
                var E211 = this.cube.EDGES[2][1][1];
                this.swap(E211.value, 0, 1);
                var E121 = this.cube.EDGES[1][2][1];
                this.swap(E121.value, 0, 1);
                this.cube.CORNERS[0][0][1] = C011;
                this.cube.CORNERS[0][1][1] = C111;
                this.cube.CORNERS[1][1][1] = C101;
                this.cube.CORNERS[1][0][1] = C001;
                this.cube.EDGES[2][0][1] = E021;
                this.cube.EDGES[0][2][1] = E211;
                this.cube.EDGES[2][1][1] = E121;
                this.cube.EDGES[1][2][1] = E201;
                break;
            };
            case 5: {
                var C000 = this.cube.CORNERS[0][0][0];
                this.swap(C000.value, 1, 2);
                var C100 = this.cube.CORNERS[1][0][0];
                this.swap(C100.value, 1, 2);
                var C101 = this.cube.CORNERS[1][0][1];
                this.swap(C101.value, 1, 2);
                var C001 = this.cube.CORNERS[0][0][1];
                this.swap(C001.value, 1, 2);
                var E201 = this.cube.EDGES[2][0][1];
                var E102 = this.cube.EDGES[1][0][2];
                var E200 = this.cube.EDGES[2][0][0];
                var E002 = this.cube.EDGES[0][0][2];
                this.cube.CORNERS[0][0][0] = C100;
                this.cube.CORNERS[1][0][0] = C101;
                this.cube.CORNERS[1][0][1] = C001;
                this.cube.CORNERS[0][0][1] = C000;
                this.cube.EDGES[2][0][1] = E002;
                this.cube.EDGES[1][0][2] = E201;
                this.cube.EDGES[2][0][0] = E102;
                this.cube.EDGES[0][0][2] = E200;
                break;
            };
            case -5: {
                var C000 = this.cube.CORNERS[0][0][0];
                this.swap(C000.value, 1, 2);
                var C100 = this.cube.CORNERS[1][0][0];
                this.swap(C100.value, 1, 2);
                var C101 = this.cube.CORNERS[1][0][1];
                this.swap(C101.value, 1, 2);
                var C001 = this.cube.CORNERS[0][0][1];
                this.swap(C001.value, 1, 2);
                var E201 = this.cube.EDGES[2][0][1];
                var E102 = this.cube.EDGES[1][0][2];
                var E200 = this.cube.EDGES[2][0][0];
                var E002 = this.cube.EDGES[0][0][2];
                this.cube.CORNERS[0][0][0] = C001;
                this.cube.CORNERS[1][0][0] = C000;
                this.cube.CORNERS[1][0][1] = C100;
                this.cube.CORNERS[0][0][1] = C101;
                this.cube.EDGES[2][0][1] = E102;
                this.cube.EDGES[1][0][2] = E200;
                this.cube.EDGES[2][0][0] = E002;
                this.cube.EDGES[0][0][2] = E201;
                break;
            };
            case 6: {
                var C010 = this.cube.CORNERS[0][1][0];
                this.swap(C010.value, 1, 2);
                var C110 = this.cube.CORNERS[1][1][0];
                this.swap(C110.value, 1, 2);
                var C111 = this.cube.CORNERS[1][1][1];
                this.swap(C111.value, 1, 2);
                var C011 = this.cube.CORNERS[0][1][1];
                this.swap(C011.value, 1, 2);
                var E211 = this.cube.EDGES[2][1][1];
                var E112 = this.cube.EDGES[1][1][2];
                var E210 = this.cube.EDGES[2][1][0];
                this.swap(E210.value, 0, 1);
                var E012 = this.cube.EDGES[0][1][2];
                this.swap(E012.value, 0, 1);
                this.cube.CORNERS[0][1][0] = C011;
                this.cube.CORNERS[1][1][0] = C010;
                this.cube.CORNERS[1][1][1] = C110;
                this.cube.CORNERS[0][1][1] = C111;
                this.cube.EDGES[2][1][1] = E112;
                this.cube.EDGES[1][1][2] = E210;
                this.cube.EDGES[2][1][0] = E012;
                this.cube.EDGES[0][1][2] = E211;
                break;
            };
            case -6: {
                var C010 = this.cube.CORNERS[0][1][0];
                this.swap(C010.value, 1, 2);
                var C110 = this.cube.CORNERS[1][1][0];
                this.swap(C110.value, 1, 2);
                var C111 = this.cube.CORNERS[1][1][1];
                this.swap(C111.value, 1, 2);
                var C011 = this.cube.CORNERS[0][1][1];
                this.swap(C011.value, 1, 2);
                var E211 = this.cube.EDGES[2][1][1];
                var E112 = this.cube.EDGES[1][1][2];
                this.swap(E112.value, 0, 1);
                var E210 = this.cube.EDGES[2][1][0];
                this.swap(E210.value, 0, 1);
                var E012 = this.cube.EDGES[0][1][2];
                this.cube.CORNERS[0][1][0] = C110;
                this.cube.CORNERS[1][1][0] = C111;
                this.cube.CORNERS[1][1][1] = C011;
                this.cube.CORNERS[0][1][1] = C010;
                this.cube.EDGES[2][1][1] = E012;
                this.cube.EDGES[1][1][2] = E211;
                this.cube.EDGES[2][1][0] = E112;
                this.cube.EDGES[0][1][2] = E210;
                break;
            };
        }

    }

    swap(a, n1, n2) {
        var tmp = a[n1];
        a[n1] = a[n2];
        a[n2] = tmp;
    }

    // old_draw() {
    //     this.ctx.strokeStyle = 'black';
    //     //Upper Face
    //     for (var x = 0; x < 3; x++) {
    //         for (var z = 0; z < 3; z++) {
    //             var y = 0;
    //             var posX = 3 * this.side + x * this.side;
    //             var posY = z * this.side;
    //             var col = 'black';
    //             var cx = x;
    //             var cy = y;
    //             var cz = 2 - z;
    //             if ((x == 1 && z == 1)) col = C.u;
    //             else {
    //                 if ((x == 1 || z == 1)) {
    //                     if (x == 1) cx = 2; else if (x == 2) cx = 1;
    //                     if (z == 1) cz = 2; else if (z == 0) cz = 1;
    //                     col = this.cube.EDGES[cx][cy][cz][1];
    //                 } else {
    //                     if (x == 2) cx = 1;
    //                     if (z == 0) cz = 1;
    //                     col = this.cube.CORNERS[cx][cy][cz][0];
    //                 }
    //             }
    //             this.ctx.fillStyle = col;
    //             this.ctx.beginPath();
    //             this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
    //             this.ctx.stroke();
    //             this.ctx.fill();
    //         }
    //     }
    //     //Left Face
    //     for (var y = 0; y < 3; y++) {
    //         for (var z = 0; z < 3; z++) {
    //             var x = 0;
    //             var posX = z * this.side;
    //             var posY = 3 * this.side + y * this.side;
    //             var col = 'black';
    //             var cx = x;
    //             var cy = y;
    //             var cz = 2 - z;
    //             if ((y == 1 && z == 1)) col = C.l;
    //             else {
    //                 if ((y == 1 || z == 1)) {
    //                     if (y == 1) cy = 2; else if (y == 2) cy = 1;
    //                     if (z == 1) cz = 2; else if (z == 0) cz = 1;
    //                     col = this.cube.EDGES[cx][cy][cz][(cz == 2 && cy == 0) ? 0 : 1];
    //                 } else {
    //                     if (y == 2) cy = 1;
    //                     if (z == 0) cz = 1;
    //                     col = this.cube.CORNERS[cx][cy][cz][2];
    //                 }
    //             }
    //             this.ctx.fillStyle = col;
    //             this.ctx.beginPath();
    //             this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
    //             this.ctx.stroke();
    //             this.ctx.fill();
    //         }
    //     }
    //     //Front Face
    //     for (var x = 0; x < 3; x++) {
    //         for (var y = 0; y < 3; y++) {
    //             var z = 0;
    //             var posX = 3 * this.side + x * this.side;
    //             var posY = 3 * this.side + y * this.side;
    //             var col = 'black';
    //             var cx = x;
    //             var cy = y;
    //             var cz = z;
    //             if ((x == 1 && y == 1)) col = C.f;
    //             else {
    //                 if ((y == 1 || x == 1)) {
    //                     if (y == 1) cy = 2; else if (y == 2) cy = 1;
    //                     if (x == 1) cx = 2; else if (x == 2) cx = 1;
    //                     col = this.cube.EDGES[cx][cy][cz][0];
    //                 } else {
    //                     if (y == 2) cy = 1;
    //                     if (x == 2) cx = 1;
    //                     col = this.cube.CORNERS[cx][cy][cz][1];
    //                 }
    //             }
    //             this.ctx.fillStyle = col;
    //             this.ctx.beginPath();
    //             this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
    //             this.ctx.stroke();
    //             this.ctx.fill();
    //         }
    //     }
    //     //Right Face
    //     for (var y = 0; y < 3; y++) {
    //         for (var z = 0; z < 3; z++) {
    //             var x = 1;
    //             var posX = 6 * this.side + z * this.side;
    //             var posY = 3 * this.side + y * this.side;
    //             var col = 'black';
    //             var cx = x;
    //             var cy = y;
    //             var cz = z;
    //             if ((y == 1 && z == 1)) col = C.r;
    //             else {
    //                 if ((y == 1 || z == 1)) {
    //                     if (y == 1) cy = 2; else if (y == 2) cy = 1;
    //                     if (z == 1) cz = 2; else if (z == 2) cz = 1;
    //                     col = this.cube.EDGES[cx][cy][cz][(cz == 2 && cy == 0) ? 0 : 1];
    //                 } else {
    //                     if (y == 2) cy = 1;
    //                     if (z == 2) cz = 1;
    //                     col = this.cube.CORNERS[cx][cy][cz][2];
    //                 }
    //             }
    //             this.ctx.fillStyle = col;
    //             this.ctx.beginPath();
    //             this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
    //             this.ctx.stroke();
    //             this.ctx.fill();
    //         }
    //     }
    //     //Back Face
    //     for (var x = 0; x < 3; x++) {
    //         for (var y = 0; y < 3; y++) {
    //             var z = 1;
    //             var posX = 9 * this.side + x * this.side;
    //             var posY = 3 * this.side + y * this.side;
    //             var col = 'black';
    //             var cx = 2 - x;
    //             var cy = y;
    //             var cz = z;
    //             if ((x == 1 && y == 1)) col = C.b;
    //             else {
    //                 if ((y == 1 || x == 1)) {
    //                     if (y == 1) cy = 2; else if (y == 2) cy = 1;
    //                     if (x == 1) cx = 2; else if (x == 0) cx = 1;
    //                     col = this.cube.EDGES[cx][cy][cz][(cx == 2 && cy == 1) ? 1 : 0];
    //                 } else {
    //                     if (y == 2) cy = 1;
    //                     if (x == 0) cx = 1;
    //                     col = this.cube.CORNERS[cx][cy][cz][1];
    //                 }
    //             }
    //             this.ctx.fillStyle = col;
    //             this.ctx.beginPath();
    //             this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
    //             this.ctx.stroke();
    //             this.ctx.fill();
    //         }
    //     }

    //     //Down Face
    //     for (var x = 0; x < 3; x++) {
    //         for (var z = 0; z < 3; z++) {
    //             var y = 1;
    //             var posX = 3 * this.side + x * this.side;
    //             var posY = 6 * this.side + z * this.side;
    //             var col = 'black';
    //             var cx = x;
    //             var cy = y;
    //             var cz = z;
    //             if ((x == 1 && z == 1)) col = C.d;
    //             else {
    //                 if ((x == 1 || z == 1)) {
    //                     if (x == 1) cx = 2; else if (x == 2) cx = 1;
    //                     if (z == 1) cz = 2; else if (z == 2) cz = 1;
    //                     col = this.cube.EDGES[cx][cy][cz][(cx == 2 && cz == 0) ? 1 : 0];
    //                 } else {
    //                     if (x == 2) cx = 1;
    //                     if (z == 2) cz = 1;
    //                     col = this.cube.CORNERS[cx][cy][cz][0];
    //                 }
    //             }
    //             this.ctx.fillStyle = col;
    //             this.ctx.beginPath();
    //             this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
    //             this.ctx.stroke();
    //             this.ctx.fill();
    //         }
    //     }
    // }

    value() {
        var cornTally = 1;
        var edgeTally = 1;
        var corners = [];
        var edges = [];
        var ffEdges = 1;
        var ffCorn = 1;
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                for (var z = 0; z < 3; z++) {
                    if ((x == 2 && y == 2) || (x == 2 && z == 2) || (z == 2 && y == 2)) {
                        break;
                    }
                    if (x == 2 || y == 2 || z == 2) {
                        var e = 0;
                        var n = this.cube.EDGES[x][y][z].Name;
                        var nx = Number(n[1]);
                        var ny = Number(n[2]);
                        var nz = Number(n[3]);
                        if ((nx == 2 && x == 2) || (ny == 2 && y == 2) || (nz == 2 && z == 2)) {
                            var dx = Math.abs(nx - x);
                            var dy = Math.abs(ny - y);
                            var dz = Math.abs(nz - z);
                            e = dx + dy + dz;
                        } else {
                            var dx = (x == 2 || nx == 2) ? 0 : (Math.abs(nx - x) + 1);
                            var dy = (y == 2 || ny == 2) ? 0 : (Math.abs(ny - y) + 1);
                            var dz = (z == 2 || nz == 2) ? 0 : (Math.abs(nz - z) + 1);
                            var e = dx + dy + dz;
                        }
                        FRONTFACE.forEach(p => {
                            if (p.Name == "E" + x + y + z)
                                ffEdges *= (e + 1);
                        })
                        edgeTally *= (1 + e);
                        edges.push(["E" + x + y + z, n, e]);
                    } else {
                        var n = this.cube.CORNERS[x][y][z].Name;
                        var nx = Number(n[1]);
                        var ny = Number(n[2]);
                        var nz = Number(n[3]);
                        var c = Math.abs(nx - x) + Math.abs(ny - y) + Math.abs(nz - z);
                        FRONTFACE.forEach(p => {
                            if (p.Name == "C" + x + y + z)
                                ffCorn *= (c + 1);
                        })
                        cornTally += (0 + c);
                        corners.push(["C" + x + y + z, n, c]);

                    }
                }
            }
        }
        return [corners, edges, [ffCorn, ffEdges]];
        // return [corners, edges, [cornTally, edgeTally]];
    }

    draw() {
        this.ctx.strokeStyle = 'black';
        //Upper Face
        for (var x = 0; x < 3; x++) {
            for (var z = 0; z < 3; z++) {
                var y = 0;
                var posX = 3 * this.side + x * this.side;
                var posY = z * this.side;
                var col = 'black';
                var cx = x;
                var cy = y;
                var cz = 2 - z;
                if ((x == 1 && z == 1)) col = C.u;
                else {
                    if ((x == 1 || z == 1)) {
                        if (x == 1) cx = 2; else if (x == 2) cx = 1;
                        if (z == 1) cz = 2; else if (z == 0) cz = 1;
                        col = this.cube.EDGES[cx][cy][cz].value[1];
                    } else {
                        if (x == 2) cx = 1;
                        if (z == 0) cz = 1;
                        col = this.cube.CORNERS[cx][cy][cz].value[0];
                    }
                }
                this.ctx.fillStyle = col;
                this.ctx.beginPath();
                this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
                this.ctx.stroke();
                this.ctx.fill();
            }
        }
        //Left Face
        for (var y = 0; y < 3; y++) {
            for (var z = 0; z < 3; z++) {
                var x = 0;
                var posX = z * this.side;
                var posY = 3 * this.side + y * this.side;
                var col = 'black';
                var cx = x;
                var cy = y;
                var cz = 2 - z;
                if ((y == 1 && z == 1)) col = C.l;
                else {
                    if ((y == 1 || z == 1)) {
                        if (y == 1) cy = 2; else if (y == 2) cy = 1;
                        if (z == 1) cz = 2; else if (z == 0) cz = 1;
                        col = this.cube.EDGES[cx][cy][cz].value[(cz == 2 && cy == 0) ? 0 : 1];
                    } else {
                        if (y == 2) cy = 1;
                        if (z == 0) cz = 1;
                        col = this.cube.CORNERS[cx][cy][cz].value[2];
                    }
                }
                this.ctx.fillStyle = col;
                this.ctx.beginPath();
                this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
                this.ctx.stroke();
                this.ctx.fill();
            }
        }
        //Front Face
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                var z = 0;
                var posX = 3 * this.side + x * this.side;
                var posY = 3 * this.side + y * this.side;
                var col = 'black';
                var cx = x;
                var cy = y;
                var cz = z;
                if ((x == 1 && y == 1)) col = C.f;
                else {
                    if ((y == 1 || x == 1)) {
                        if (y == 1) cy = 2; else if (y == 2) cy = 1;
                        if (x == 1) cx = 2; else if (x == 2) cx = 1;
                        col = this.cube.EDGES[cx][cy][cz].value[0];
                    } else {
                        if (y == 2) cy = 1;
                        if (x == 2) cx = 1;
                        col = this.cube.CORNERS[cx][cy][cz].value[1];
                    }
                }
                this.ctx.fillStyle = col;
                this.ctx.beginPath();
                this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
                this.ctx.stroke();
                this.ctx.fill();
            }
        }
        //Right Face
        for (var y = 0; y < 3; y++) {
            for (var z = 0; z < 3; z++) {
                var x = 1;
                var posX = 6 * this.side + z * this.side;
                var posY = 3 * this.side + y * this.side;
                var col = 'black';
                var cx = x;
                var cy = y;
                var cz = z;
                if ((y == 1 && z == 1)) col = C.r;
                else {
                    if ((y == 1 || z == 1)) {
                        if (y == 1) cy = 2; else if (y == 2) cy = 1;
                        if (z == 1) cz = 2; else if (z == 2) cz = 1;
                        col = this.cube.EDGES[cx][cy][cz].value[(cz == 2 && cy == 0) ? 0 : 1];
                    } else {
                        if (y == 2) cy = 1;
                        if (z == 2) cz = 1;
                        col = this.cube.CORNERS[cx][cy][cz].value[2];
                    }
                }
                this.ctx.fillStyle = col;
                this.ctx.beginPath();
                this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
                this.ctx.stroke();
                this.ctx.fill();
            }
        }
        //Back Face
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                var z = 1;
                var posX = 9 * this.side + x * this.side;
                var posY = 3 * this.side + y * this.side;
                var col = 'black';
                var cx = 2 - x;
                var cy = y;
                var cz = z;
                if ((x == 1 && y == 1)) col = C.b;
                else {
                    if ((y == 1 || x == 1)) {
                        if (y == 1) cy = 2; else if (y == 2) cy = 1;
                        if (x == 1) cx = 2; else if (x == 0) cx = 1;
                        col = this.cube.EDGES[cx][cy][cz].value[(cx == 2 && cy == 1) ? 1 : 0];
                    } else {
                        if (y == 2) cy = 1;
                        if (x == 0) cx = 1;
                        col = this.cube.CORNERS[cx][cy][cz].value[1];
                    }
                }
                this.ctx.fillStyle = col;
                this.ctx.beginPath();
                this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
                this.ctx.stroke();
                this.ctx.fill();
            }
        }

        //Down Face
        for (var x = 0; x < 3; x++) {
            for (var z = 0; z < 3; z++) {
                var y = 1;
                var posX = 3 * this.side + x * this.side;
                var posY = 6 * this.side + z * this.side;
                var col = 'black';
                var cx = x;
                var cy = y;
                var cz = z;
                if ((x == 1 && z == 1)) col = C.d;
                else {
                    if ((x == 1 || z == 1)) {
                        if (x == 1) cx = 2; else if (x == 2) cx = 1;
                        if (z == 1) cz = 2; else if (z == 2) cz = 1;
                        col = this.cube.EDGES[cx][cy][cz].value[(cx == 2 && cz == 0) ? 1 : 0];
                    } else {
                        if (x == 2) cx = 1;
                        if (z == 2) cz = 1;
                        col = this.cube.CORNERS[cx][cy][cz].value[0];
                    }
                }
                this.ctx.fillStyle = col;
                this.ctx.beginPath();
                this.ctx.rect(this.x0 + posX, this.y0 + posY, this.side, this.side);
                this.ctx.stroke();
                this.ctx.fill();
            }
        }
    }
}