import { Rubik } from './Rubik.js';
import { F } from './Rubik.js';
import { M } from './Rubik.js';
//const M = { l: 1, f: 2, r: 3, b: 4, u: 5, d: 6, l_: -1, f_: -2, r_: -3, b_: -4, u_: -5, d_: -6 };

var canvas, ctx, w, h, output;
window.onload = function () {
    var moves = [1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5, -6];
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    output = document.getElementById("output");
    w = window.innerWidth;
    h = window.innerHeight / 2;
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    var myOutput = "";
    var now = Date.now();
    var c = 0;
    const params = { ctx: ctx, side: 30, x: 60, y: 60, cube: null };
    const myCube = new Rubik(params);
    myCube.move(1);
    myCube.move(2);
    myCube.move(1);
    myCube.move(1);
    myCube.move(4);
    myCube.move(1);
    myCube.move(5);
    myCube.move(3);
    myCube.move(5);
    myCube.move(3);
    myCube.move(3);
    myCube.move(3);
    myCube.move(3);
    myCube.move(5);
    myCube.move(3);
    myCube.move(5);
    myCube.move(1);
    myCube.move(4);
    myCube.move(1);
    myCube.move(1);
    myCube.move(2);
    myCube.move(1);

    myCube.move(M.f);
    console.log(myCube.value()[2].join(","), myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.l_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.f_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.f_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.b_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.r);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.r);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.l);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.f);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.d_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.l);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.l);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.b);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.b);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.d_);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.b);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.b);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.u);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.r);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.r);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.l);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);
    myCube.move(M.l);
    console.log(myCube.value()[2], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] / myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0], myCube.value()[2].sort((a, b) => Number(a) < Number(b)).reverse()[0] % myCube.value()[2].sort((a, b) => Number(a) < Number(b))[0]);



    myCube.draw();



    // moves.forEach(m0 => {
    //     const params = { ctx: ctx, side: 30, x: 60, y: 60, cube: null };
    //     const myCube = new Rubik(params);
    //     var mText = m0;
    //     myCu4e.move(m0);
    //     var val = myCube.value();
    //     myOutput += (mText + ", " + val[0] + ", " + val[1] + '<br>');
    //     moves.forEach(m1 => {
    //         if (m1 !== -m0) {
    //             mText = (m0 + " + " + m1);
    //             myCube.move(m1);
    //             val = myCube.value();
    //             c++;
    //             myOutput += (mText + ", " + val[0] + ", " + val[1] + '<br>');
    //             moves.forEach(m2 => {
    //                 if (m2 !== -m1) {

    //                     mText = (m0 + " + " + m1 + " + " + m2);
    //                     myCube.move(m2);
    //                     val = myCube.value();
    //                     c++;

    //                     myOutput += (mText + ", " + val[0] + ", " + val[1] + '<br>');
    //                     moves.forEach(m3 => {
    //                         if (m3 !== -m2) {

    //                             myCube.move(m3);
    //                             mText = (m0 + " + " + m1 + " + " + m2) + " + " + m3;
    //                             val = myCube.value();
    //                             c++;

    //                             myOutput += (mText + ", " + val[0] + ", " + val[1] + '<br>');
    //                             moves.forEach(m4 => {
    //                                 if (m4 !== -m3) {
    //                                     myCube.move(m4);
    //                                     mText = m0 + " + " + m1 + " + " + m2 + " + " + m3 + " + " + m4;
    //                                     val = myCube.value();
    //                                     c++;

    //                                     myOutput += (mText + ", " + val[0] + ", " + val[1] + '<br>');
    //                                     moves.forEach(m5 => {
    //                                         if (m5 !== -m4) {
    //                                             myCube.move(m5);
    //                                             mText = m0 + " + " + m1 + " + " + m2 + " + " + m3 + " + " + m4 + " + " + m5;
    //                                             val = myCube.value();
    //                                             c++;

    //                                             myOutput += (mText + ", " + val[0] + ", " + val[1] + '<br>');
    //                                             myCube.move(-m5);
    //                                             console.log(c);
    //                                         }
    //                                     })
    //                                     myCube.move(-m4);
    //                                 }
    //                             })
    //                         }

    //                         myCube.move(-m3);
    //                         //console.log(mText);
    //                     })
    //                     myCube.move(-m2);
    //                 }
    //             })
    //             myCube.move(-m1);
    //         }
    //     })
    //     myCube.move(-m0);
    // })
    // output.innerHTML = myOutput;
    // console.log(Date.now() - now);
    console.log(c);
}

