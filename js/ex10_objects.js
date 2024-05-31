const person = {
 firstName: "John",
 lastName: "Doe",
 age: 50,
 eyeColor: "blue",
 address: {
    street: "street one",
    zip: 560076,
    state: "Ka",
    country: "india"
 },
 fullname: function(){
    return this.firstName+" "+this.lastName;
 }
};

//console.log( person);
//console.log( Object.keys(person));
//console.log( Object.values(person));
//console.log( person.firstName);
//console.log( person.address);
//console.log(" Fullname is :"+ person.fullname());

let stringPerson = JSON.stringify(person);
console.log(stringPerson);
jsonPerson = JSON.parse(stringPerson);
console.log(jsonPerson);
// const person1 = new Object();
// person1.firstName = "John";
// person1.lastName = "Doe";
// person1.age = 50;
// person1.eyeColor = "blue";
// person1.legs = 2;

// console.log( person1);