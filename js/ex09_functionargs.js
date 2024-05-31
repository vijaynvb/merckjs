

function add(a, b=0, ...args){
    let sum =0;
    sum = a + b;
    if(args.length>0){
        for(let val of args){
            sum =sum + val;
        }
    }
    return sum;
}
//add(4,5);

//console.log(add(4));

console.log(add(1,2,3,4,5,6,7));