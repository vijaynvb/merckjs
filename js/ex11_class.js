class Car {
    constructor(name, year, brand) {
        this.name = name;
        this.year = year;
        this._bradname = brand;
    }

    get BrandName(){
        return this._bradname;
    }
    set BrandName(value){
        this._bradname = value;
    }

    age(){
        let currentdate = new Date();
        return currentdate.getFullYear() - this.year;
    }

    static kind(){
        console.log("land transport");
    }
}

let car1 = new Car("Mustang", 2020, "Ford");

//console.log(typeof car1);
//console.log(car1);
//console.log(car1.age());
car1.BrandName="Maruthi";
console.log(car1.BrandName);
console.log(Car.kind());
