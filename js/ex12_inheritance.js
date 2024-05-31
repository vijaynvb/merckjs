class BasicCalculator{
    constructor(a,b){
        this.a =a;
        this.b =b;
    }
    add(){return this.a+this.b;}
    sub(){return this.a-this.b;}
    mul(){return this.a*this.b;}
    div(){return this.a/this.b;}
}

let bc = new BasicCalculator(4,5);
bc.add();

class ScientificCalculator extends BasicCalculator{
    constructor(c){
        super(c,5); // BasicCalculator(4,5)
        this.c = c;
    }
    constructor(c,d){
        super(c,d); // BasicCalculator(4,5)
        this.c = c;
    }
    sqrt(){
        return this.c*this.c;
    }
}

let sc = new ScientificCalculator(4);
console.log(sc.sqrt());
console.log(sc.add());
let sc1 = new ScientificCalculator(4,5);