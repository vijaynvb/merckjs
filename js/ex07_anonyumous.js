console.log("Select your operations to perfrom from below list: \n1- Add\n2-Sub\n3-Div\n4-Mul");

let option =2;
let myFunction;
switch(option){
    case 1:
        myFunction = function (a,b){return a+b;}
        break;
    case 2:
        myFunction = function (a,b){return a-b;}
        break;
    case 3:
        myFunction = function (a,b){return a/b;}
        break;
    case 4:
        myFunction = function (a,b){return a*b;}
        break;
    default:
        console.log("Option is wrong");
}
//myFunction = 10;

console.log(typeof myFunction);
let output = myFunction(4,5);
console.log(output);