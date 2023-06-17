// Clicking on each Method to show its form and hide the other forms
document.querySelector("#Bisection").addEventListener("click", function () {
  document.querySelector("#Bis-Div").classList.remove("d-none");
  document.querySelector("#False-Div").classList.add("d-none");
  document.querySelector("#Simple-Div").classList.add("d-none");
  document.querySelector("#Newton-Div").classList.add("d-none");
  document.querySelector("#Scant-Div").classList.add("d-none");
  document.querySelector("#results").classList.add("d-none");
});
document.querySelector("#FalsePos").addEventListener("click", function () {
  document.querySelector("#Bis-Div").classList.add("d-none");
  document.querySelector("#False-Div").classList.remove("d-none");
  document.querySelector("#Simple-Div").classList.add("d-none");
  document.querySelector("#Newton-Div").classList.add("d-none");
  document.querySelector("#Scant-Div").classList.add("d-none");
  document.querySelector("#results").classList.add("d-none");
});
document.querySelector("#FixedPoint").addEventListener("click", function () {
  document.querySelector("#Bis-Div").classList.add("d-none");
  document.querySelector("#False-Div").classList.add("d-none");
  document.querySelector("#Simple-Div").classList.remove("d-none");
  document.querySelector("#Newton-Div").classList.add("d-none");
  document.querySelector("#Scant-Div").classList.add("d-none");
  document.querySelector("#results").classList.add("d-none");
});
document.querySelector("#Newton").addEventListener("click", function () {
  document.querySelector("#Bis-Div").classList.add("d-none");
  document.querySelector("#False-Div").classList.add("d-none");
  document.querySelector("#Simple-Div").classList.add("d-none");
  document.querySelector("#Newton-Div").classList.remove("d-none");
  document.querySelector("#Scant-Div").classList.add("d-none");
  document.querySelector("#results").classList.add("d-none");
});
document.querySelector("#Scant").addEventListener("click", function () {
  document.querySelector("#Bis-Div").classList.add("d-none");
  document.querySelector("#False-Div").classList.add("d-none");
  document.querySelector("#Simple-Div").classList.add("d-none");
  document.querySelector("#Newton-Div").classList.add("d-none");
  document.querySelector("#Scant-Div").classList.remove("d-none");
  document.querySelector("#results").classList.add("d-none");
});

// Calls the method function based on the chosen method
function Calculate() {
  if (document.getElementById('fx').value != '' && document.getElementById('err').value != '') {
    snowman();
    document.querySelector("#results").classList.remove("d-none");
    let checkedMethod = document.querySelector(
      'input[name="Method"]:checked'
    ).value;
    switch (checkedMethod) {
      case "Bisection":
        BisAndFalse(checkedMethod);
        break;
      case "FalsePos":
        BisAndFalse(checkedMethod);
        break;
      case "FixedPoint":
        FixedPoint();
        break;
      case "Newton":
        Newton();
        break;
      case "Scant":
        Scant();
        break;
      default:
        break;
    }
  }
}

// Equation solver
function f(x, scope) {
  return math.evaluate(
    document.getElementById("fx").value.toLowerCase().replaceAll("x", x),
    scope
  );
}
function fdash(x, scope) {
  fd = math
    .derivative(
      document.getElementById("fx").value.toLowerCase().replaceAll("x", x),
      x
    )
    .toString();
  return math.evaluate(fd, scope);
}
function fSimplified(x, scope) {
  fs = math
    .simplify(
      document.getElementById("fx").value.toLowerCase().replaceAll("x", x)
    )
    .toString();
    console.log(fs);
  return math.evaluate(fs, scope);
}

// Bisection and False Position function based on the chosen method
function BisAndFalse(method) {
  let XL, XU;
  if (method == "Bisection") {
    XL = document.getElementById("Bis-Xl").value;
    XU = document.getElementById("Bis-Xu").value;
  } else {
    XL = document.getElementById("False-Xl").value;
    XU = document.getElementById("False-Xu").value;
  }
  let scope = {
    xl: Number(XL),
    xu: Number(XU),
    xr: 0,
  };
  let fxl = f("xl", scope);
  let fxu = f("xu", scope);
  if (fxl * fxu < 0) {
    let currError = 100,
      result,
      resultList = [],
      err = document.getElementById("err").value,
      fxr,
      root;
    for (let i = 0; currError > err; i++) {
      if (method == "Bisection") scope.xr = (scope.xl + scope.xu) / 2;
      else scope.xr = scope.xu - (fxu * (scope.xl - scope.xu)) / (fxl - fxu);
      fxr = f("xr", scope);
      if (i != 0)
        currError =
          math.abs((scope.xr - resultList[i - 1].Xr) / scope.xr) * 100;
      result = {
        i: i,
        Xl: scope.xl,
        FXl: fxl,
        Xu: scope.xu,
        FXu: fxu,
        Xr: scope.xr,
        FXr: fxr,
        Error: currError,
      };
      resultList.push(result);
      if (fxl * fxr < 0) {
        scope.xu = scope.xr;
        fxu = fxr;
      } else {
        scope.xl = scope.xr;
        fxl = fxr;
      }
      root = resultList[i].Xr;
    }
    showTable(result, resultList, root);
  } else {
    alert("Not Solvable !!")
  }
}

// Simple Fixed Point function
function FixedPoint() {
  let scope = {
    xi: Number(document.getElementById("Simple-Xi").value),
  };
  let currError = 100,
    result,
    resultList = [],
    fxi,
    err = document.getElementById("err").value,
    root;
  for (let i = 0; currError > err; i++) {
    fxi = f("xi", scope);
    if (i != 0)
      currError = math.abs((scope.xi - resultList[i - 1].Xi) / scope.xi) * 100;
    result = {
      i: i,
      Xi: scope.xi,
      FXi: fxi,
      Error: currError,
    };
    resultList.push(result);
    scope.xi = fxi;
    root = resultList[i].Xi;
  }
  showTable(result, resultList,root)
}

// Newton Function
function Newton() {
  let scope = {
    xi: Number(document.getElementById("Newton-Xi").value),
  };
  let currError = 100,
    result,
    resultList = [],
    fxi,
    fdashxi,
    err = document.getElementById("err").value,
    root;
  for (let i = 0; currError > err; i++) {
    fxi = f("xi", scope);
    fdashxi = fdash("xi", scope);
    if (i != 0)
      currError = math.abs((scope.xi - resultList[i - 1].Xi) / scope.xi) * 100;
    result = {
      i: i,
      Xi: scope.xi,
      FXi: fxi,
      FDashXi: fdashxi,
      Error: currError,
    };
    resultList.push(result);
    scope.xi = scope.xi - fxi / fdashxi;
    root = resultList[i].Xi;
  }
  showTable(result, resultList,root);
}

// Scant Function
function Scant() {
  let scope = {
    xi: Number(document.getElementById("Scant-Xi").value),
    xii: Number(document.getElementById("Scant-Xi-1").value),
  };
  let currError = 100,
    result,
    resultList = [],
    fxi,
    fxii,
    err = document.getElementById("err").value,
    root;
  for (let i = 0; currError > err; i++) {
    fxi = f("xi", scope);
    fxii = f("xii", scope);
    if (i != 0)
      currError = math.abs((scope.xi - resultList[i - 1].Xi) / scope.xi) * 100;
    result = {
      i: i,
      Xi: scope.xi,
      FXi: fxi,
      Xi_1: scope.xii,
      FXi_1: fxii,
      Error: currError,
    };
    resultList.push(result);
    scope.xi = scope.xi - ((fxi * (scope.xii - scope.xi)) / (fxii - fxi));
    scope.xii = resultList[i].Xi;
    root = resultList[i].Xi;
  }
  showTable(result, resultList,root);
}

function showTable(tablehead, tablebody,root) {
  //Initials
  let td_Head_values = [];
  let td_Head = ``;
  let td_Body = ``;
  let tr_Body = ``;
  let cartonaBody = ``;
  //head loop
  for (let i = 0; i < Object.keys(tablehead).length; i++) {
    td_Head_values.push(Object.keys(tablehead)[i]);
    let temp = `<th>${Object.keys(tablehead)[i]}</th>`
    td_Head = td_Head.concat(temp);
  }
  //body loop
  for (let i = 0; i < tablebody.length; i++) {
    let temp;
    for (let j = 0; j < Object.keys(tablebody[i]).length; j++) {
      let attributeName = td_Head_values[j]
      temp = `<td>${tablebody[i][attributeName]}</td>`
      td_Body = td_Body.concat(temp);
    }
    tr_Body = `<tr>${td_Body}</tr>`
    cartonaBody = cartonaBody.concat(tr_Body);
    td_Body = ``;
  }
  //setting in HTML
  document.getElementById("table-head").innerHTML = td_Head;
  document.getElementById("table-body").innerHTML = cartonaBody;
  document.getElementById("root").innerHTML = root;
}

// Simplification Function Demo (Still Under Construction)....
// function g() {
//   // let fx = '-x^2 + 1.8*x + 2.5';
//   // let fx = '-0.9*x^2 + 1.7*x + 2.5';
//   let fx = '0.95x^3 - 5.9x^2 +10.9x-6'
//   // let fx ='2x^3 - 11.7x^2 + 17.7x - 5'
//   let maxPow = 1;
//   let powI = 0;
//   for (let i = 0; i < fx.length; i++) {
//       if (fx[i] == '^') {
//           if (maxPow < fx[i + 1]) {
//               maxPow = fx[i + 1];
//               powI = i + 2;
//           }
//       }
//   }
//   console.log(maxPow);
//   console.log(powI);
//   let powSign = 0;
//   for (let i = powI; i > 0; i--) {
//       if (fx[i] == '+' || fx[i] == '-') {
//           powSign = fx[i];
//           break;
//       }
//   }
//   let bigX = fx.slice(powSign, powI);
//   let gx = fx.slice(powI);
//   console.log(bigX);
//   console.log(gx);
//   let x
//   if(bigX.includes('*')){
//       x = bigX.split('*x^');
//   }
//   else{
//       x = bigX.split('x^');
//   }
//   console.log(x);
//   realGX = `((${gx})/${x[0]})^(1/${x[1]})`;
//   console.log(realGX);
//   scope = {
//       x: 5
//   }
//   let answer = math.evaluate(realGX, scope)
//   console.log(answer.im);
// };

// -0.9*x^2 + 1.7*x + 2.5



// Test Cases

// Bisection
// f(x) = -2 + 7x - 5x^2 + 6x^3, e = 10%, xl = 0, xu= 1

// False Position
// f(x) = -26 + 82.3x - 88x^2 + 45.4x^3 - 9x^4 + 0.65x^5, e = 0.2%, xl = 0.5, xu = 1 (Works)
// f(x) = -13 - 20x + 19x^2 - 3x^3, e = 1%, xl = -1, xu = 0 (Works)

// Simple Fixed Point
// f(x) = -0.9x^2 + 1.7x + 2.5, e = 0.7%, x0 = 5
// f(x) = -x^2 + 1.8x + 2.5, e = 0.2%, x0 = 5

// Newton
// f(x) = -0.9x^2 + 1.7x + 2.5, e = 0.7%, x0 = 5

//Scant
// f(x) = 0.95x^3 - 5.9x^2 + 10.9x - 6, e = 0.5%, x0 = 3.5, x-1 = 2.5

//-2+7x-5x^2+6x^3
