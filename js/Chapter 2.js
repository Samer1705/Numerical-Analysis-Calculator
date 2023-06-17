// Clicking on each Method to show its form and hide the other forms
document.querySelector("#GE").addEventListener("click", function () {
  document.querySelector("#PP").classList.remove("d-none");
  document.querySelector("#results").classList.replace("d-flex", "d-none");
});
document.querySelector("#GJE").addEventListener("click", function () {
  document.querySelector("#PP").classList.remove("d-none");
  document.querySelector("#results").classList.replace("d-flex", "d-none");
});
document.querySelector("#LU").addEventListener("click", function () {
  document.querySelector("#PP").classList.add("d-none");
  document.querySelector("#results").classList.replace("d-flex", "d-none");
});
document.querySelector("#Cramer").addEventListener("click", function () {
  document.querySelector("#PP").classList.add("d-none");
  document.querySelector("#results").classList.replace("d-flex", "d-none");
});


let x11_input = document.getElementById('x11')
let x21_input = document.getElementById('x21')
let x31_input = document.getElementById('x31')
let x41_input = document.getElementById('x41')
let x12_input = document.getElementById('x12')
let x22_input = document.getElementById('x22')
let x32_input = document.getElementById('x32')
let x42_input = document.getElementById('x42')
let x13_input = document.getElementById('x13')
let x23_input = document.getElementById('x23')
let x33_input = document.getElementById('x33')
let x43_input = document.getElementById('x43')

function Calculate() {
  if (x11_input.value != '' && x21_input.value != '' && x31_input.value != '' && x41_input.value != '' && x12_input.value != '' && x22_input.value != '' && x32_input.value != '' && x42_input.value != '' && x13_input.value != '' && x23_input.value != '' && x33_input.value != '' && x43_input.value != '') {
    document.querySelector("#results").classList.replace("d-none", "d-flex");
    snowman();
    let x11 = Number(x11_input.value)
    let x21 = Number(x21_input.value)
    let x31 = Number(x31_input.value)
    let x41 = Number(x41_input.value)
    let x12 = Number(x12_input.value)
    let x22 = Number(x22_input.value)
    let x32 = Number(x32_input.value)
    let x42 = Number(x42_input.value)
    let x13 = Number(x13_input.value)
    let x23 = Number(x23_input.value)
    let x33 = Number(x33_input.value)
    let x43 = Number(x43_input.value)
    let a = [[x11, x21, x31, x41], [x12, x22, x32, x42], [x13, x23, x33, x43]];
    // let a = [[4, 1, -1, -2], [5, 1, 2, 4], [6, 1, 1, 6]];
    console.log(a);
    let checkedMethod = document.querySelector(
      'input[name="Method"]:checked'
    ).value;
    switch (checkedMethod) {
      case "GE":
        GaussElimination(a);
        break;
      case "GJE":
        GaussJordan(a);
        break;
      case "LU":
        LU(a);
        break;
      case "Cramer":
        Cramer(a);
        break;
      default:
        break;
    }
  }
}

// Gauss Elimination Function
function GaussElimination(a) {
  let m21 = a[1][0] / a[0][0];
  let m31 = a[2][0] / a[0][0];

  a[1][0] -= m21 * a[0][0];
  a[1][1] -= m21 * a[0][1];
  a[1][2] -= m21 * a[0][2];
  a[1][3] -= m21 * a[0][3];

  a[2][0] -= m31 * a[0][0];
  a[2][1] -= m31 * a[0][1];
  a[2][2] -= m31 * a[0][2];
  a[2][3] -= m31 * a[0][3];

  let m32 = a[2][1] / a[1][1];

  a[2][1] -= m32 * a[1][1];
  a[2][2] -= m32 * a[1][2];
  a[2][3] -= m32 * a[1][3];

  console.log(a);

  let x3 = a[2][3] / a[2][2];
  let x2 = (a[1][3] - a[1][2] * x3) / a[1][1];
  let x1 = (a[0][3] - a[0][1] * x2 - a[0][2] * x3) / a[0][0];

  document.getElementById("resX1").innerHTML = x1;
  document.getElementById("resX2").innerHTML = x2;
  document.getElementById("resX3").innerHTML = x3;
}

// Gauss Jordan Function
function GaussJordan(a) {
  // let a = JSON.parse(JSON.stringify(b));

  let temp = a[0][0];
  a[0][0] /= temp;
  a[0][1] /= temp;
  a[0][2] /= temp;
  a[0][3] /= temp;
  console.log(a);

  temp = a[1][0];
  a[1][0] = temp * a[0][0] - a[1][0];
  a[1][1] = temp * a[0][1] - a[1][1];
  a[1][2] = temp * a[0][2] - a[1][2];
  a[1][3] = temp * a[0][3] - a[1][3];

  temp = a[2][0];
  a[2][0] = temp * a[0][0] - a[2][0];
  a[2][1] = temp * a[0][1] - a[2][1];
  a[2][2] = temp * a[0][2] - a[2][2];
  a[2][3] = temp * a[0][3] - a[2][3];

  console.log(a);

  temp = a[1][1];
  a[1][1] /= temp;
  a[1][2] /= temp;
  a[1][3] /= temp;

  temp = a[0][1];
  a[0][0] = temp * a[1][0] - a[0][0];
  a[0][1] = temp * a[1][1] - a[0][1];
  a[0][2] = temp * a[1][2] - a[0][2];
  a[0][3] = temp * a[1][3] - a[0][3];

  temp = a[2][1];
  a[2][0] = temp * a[1][0] - a[2][0];
  a[2][1] = temp * a[1][1] - a[2][1];
  a[2][2] = temp * a[1][2] - a[2][2];
  a[2][3] = temp * a[1][3] - a[2][3];

  console.log(a);

  temp = a[2][2];
  a[2][2] /= temp;
  a[2][3] /= temp;

  temp = a[0][2];
  a[0][0] = temp * a[2][0] - a[0][0];
  a[0][1] = temp * a[2][1] - a[0][1];
  a[0][2] = temp * a[2][2] - a[0][2];
  a[0][3] = temp * a[2][3] - a[0][3];

  temp = a[1][2];
  a[1][0] = temp * a[2][0] - a[1][0];
  a[1][1] = temp * a[2][1] - a[1][1];
  a[1][2] = temp * a[2][2] - a[1][2];
  a[1][3] = temp * a[2][3] - a[1][3];

  console.log(a);

  let x1 = a[0][3] / a[0][0];
  let x2 = a[1][3] / a[1][1];
  let x3 = a[2][3] / a[2][2];

  document.getElementById("resX1").innerHTML = x1;
  document.getElementById("resX2").innerHTML = x2;
  document.getElementById("resX3").innerHTML = x3;
}

// Cramer Function
function Cramer(a) {
  let a0 = [[a[0][0], a[0][1], a[0][2]], [a[1][0], a[1][1], a[1][2]], [a[2][0], a[2][1], a[2][2]]];
  console.log(a0);
  let deta0 = math.det(a0);
  console.log(deta0);

  let a1 = [[a[0][3], a[0][1], a[0][2]], [a[1][3], a[1][1], a[1][2]], [a[2][3], a[2][1], a[2][2]]];
  console.log(a1);
  let deta1 = math.det(a1);
  console.log(deta1);

  let a2 = [[a[0][0], a[0][3], a[0][2]], [a[1][0], a[1][3], a[1][2]], [a[2][0], a[2][3], a[2][2]]];
  console.log(a2);
  let deta2 = math.det(a2);
  console.log(deta2);

  let a3 = [[a[0][0], a[0][1], a[0][3]], [a[1][0], a[1][1], a[1][3]], [a[2][0], a[2][1], a[2][3]]];
  console.log(a3);
  let deta3 = math.det(a3);
  console.log(deta3);

  let x1 = deta1 / deta0;
  let x2 = deta2 / deta0;
  let x3 = deta3 / deta0;

  document.getElementById("resX1").innerHTML = x1;
  document.getElementById("resX2").innerHTML = x2;
  document.getElementById("resX3").innerHTML = x3;
}

// LU Function
function LU(a) {
  GaussElimination(a);
  // Perform LU decomposition
  // let n = a.length;
  // let L = math.zeros(n, n);
  // let U = math.zeros(n, n);

  // for (let i = 0; i < n; i++) {
  //   L[i][i] = 1;

  //   for (let j = 0; j < n; j++) {
  //     let sum = 0;
  //     for (let k = 0; k < i; k++) {
  //       sum += L[i][k] * U[k][j];
  //     }
  //     U[i][j] = a[i][j] - sum;

  //     sum = 0;
  //     for (let k = 0; k < i; k++) {
  //       sum += L[j][k] * U[k][i];
  //     }
  //     L[j][i] = (a[j][i] - sum) / U[i][i];
  //   }
  // }

  // // Solve using LU decomposition
  // let b = math.matrix([a[0][3], a[1][3], a[2][3]]);
  // let y = math.lusolve(L, b);
  // let x = math.lusolve(U, y);

  // let x1 = x[0][0];
  // let x2 = x[1][0];
  // let x3 = x[2][0];

  // document.getElementById("resX1").innerHTML = x1;
  // document.getElementById("resX2").innerHTML = x2;
  // document.getElementById("resX3").innerHTML = x3;
}








//  _         _
// |00 01 02 03|
// |10 11 12 13|
// |20 21 22 23|
// |_         _|

// Test Casses

// Gauss Elimination
// [[2 1 1 8] [4 1 0 11] [-2 2 1 3]], x1 = 2, x2 = 3, x3 = 1
// [[2 1 -1 1] [5 2 2 -4] [3 1 1 5]], x1 = 14, x2 = -32, x3 = -5
