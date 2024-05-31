

function add(a,b){
    const result = a+b;
    return result;
}

const lambda1 = (a,b) => {
    const result = a+b;
    return result;
}
const lambda2 = (a,b) => { return a+b;}
const lambda3 = (a,b) => a+b;


function increment(a){
    return ++a;
}

const lambda4 = (a) => {return ++a;}
const lambda5 = a => ++a;

function sayHello(){
    console.log("Hello");
}

const lambda6 = ()=> console.log("Hello");

console.log(lambda1(4,5));
console.log(lambda2(4,5));
console.log(lambda3(4,5));
console.log(lambda4(1));
console.log(lambda5(1));
console.log(lambda6());