console.log('This is typescript!');

let name: string = 'Oscar';
name = 'Champ';

console.log(name.toUpperCase())

const numbers: number[] = [1,2,3];
//numbers.push('2'); Does not work!!
numbers.push(4);

console.log(numbers.length);

// Union Types:

let value: string|number;

value = 'Hello';
console.log(value.toUpperCase());

value = 32;
console.log(value + value);

// value = false; Does not work

function printId(id: number|string) {
  console.log(id);
}

printId('doggie');
printId(22);
printId(true);

// Custom Types:

type ID = number|string;

function printId2(id:ID) {
  console.log(id);
}
printId2('doggie');
printId2(22);
printId2(true);

// When to use any vs. union type
// union when all known types are known or constrained to a few types
// any when its a last resort when the type is unknown or dynamic

// Using unknown instead of any

function processValue(value:unknown){
  if(typeof value === 'string'){
    return `This is a string ${value}`; 
  } else if (typeof value === 'number'){
    return `This is a number:${value}`;
  } else {
    return 'The Value is unknown';
  }
}

console.log(processValue('Hello, TypeScript!')); // The value is a string: Hello, TypeScript!
console.log(processValue(42)); // The value is a number: 42
console.log(processValue(true)); 

// Objects and Arrays 
const tomato = { name: 'Tomato', price: 2 };
const potato = { name: 'Potato', price: 1 };
const carrot = { name: 'Carrot' };

// let vegetables: { name: string; price: number }[] = [tomato, potato, carrot]; // carrot throws an error

// const vegetables: {name: string, price?: number}[] = [tomato, potato, carrot] // carrot no longer throws an error because price is optional

const vegetables: {readonly name:string, readonly price?: number}[] = [tomato, potato, carrot]; // This is immutable now

vegetables[0].name = 'turnip'; // error here

const vegetables2: readonly {name:string, price?: number}[] = [tomato, potato, carrot];// makes the whole array immutable
vegetables2.pop(); // error here, can't use array methods.

// An example with both
const vegetables3: readonly {readonly name:string, readonly price?: number}[] = [tomato, potato, carrot];
vegetables3.push(potato); // can't use array methods
vegetables3[2].price = 3; // can't update properties

console.log(vegetables);

// return types

// inferred returns
function squareNum(num: number) {
  return num*num;
}

console.log(squareNum(2)); // typescript infers the return type is a number


// explicit returns
function cubeNum(num: number):number{
  return num*num*num;
}

console.log(cubeNum(3)); // explicted return type of number

const hasDiscount = false;

function priceUp(num: number):number | string {
  if(hasDiscount) {
    return 'Discounted!'; // errors if return type does not include a string
  }
  return num + 1;
}

console.log(priceUp(2));


