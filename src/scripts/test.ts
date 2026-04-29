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

// Rest Params with words
// using rest lets you handle multiple arguments if the total amount isn't fixed
function joinWords(...words:string[]):string{
  return words.join(' ');
}

const greeting = joinWords('Hello', 'My dude', "I'm", 'so', 'excited');
console.log(greeting);

// Rest params with numbers
function addAllNumbers(...nums: number[]):number{
  return nums.reduce((total, num) => total + num, 0);
}

const totalBill = addAllNumbers(55,70,24);
console.log(totalBill);

// Rest params with arrays
function mergeArrays(...arrays: number[][]): number[] {
  return arrays.flat();
}

const combined = mergeArrays([1, 2], [3, 4], [5, 6]);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// objects with specific properties
function createEmployee({id}: {id: number}): {id: number, isActive: boolean}{
  return {id: id, isActive : id % 2 === 0};
}

const firstEmployee = createEmployee({id: 1});
console.log(firstEmployee);

const secondEmployee = createEmployee({id: 2});
console.log(secondEmployee);

// Type Aliases

type User = {
  name: string,
  age: number
}

function getUserDetails(user: User):string {
  return `${user.name}, ${user.age} years old`;
}

const user: User = {name: 'Alice', age: 21};
console.log(getUserDetails(user));
const errorUser : User = {name: 'Bob'}; // Typescript will flag that age is missing

// Intersection Type
// A type that must satisfy all conditions, similar to union by not optional

type Address = {
  city: string,
  state: string
}

type UserWithAddress = User & Address;

function getUserDetails2(user: UserWithAddress): string {
  return `${user.name} (${user.age} years old), lives in ${user.city}, ${user.state}`;
}

const user3: UserWithAddress = {
  name: "Alice",
  age: 30,
  city: "New York",
  state: "New York"
};

console.log(getUserDetails2(user3));
// Output: "Alice (30 years old), lives in New York, USA"

// Interface Type
// Interface is a blueprint for an object

interface UserI {
  name: string,
  age: number,
  address: string
}

function getUserInfo(user: UserI): string {
  return `${user.name} (${user.age} years old) lives at ${user.address}`;
}

const userI: UserI = {
  name: "Alice",
  age: 30,
  address: "123 Main St",
};

console.log(getUserInfo(userI));

// Differences between Type and Interface
// How to Extend between the two
// Interfaces:

interface Address4 {
  city: string,
  state: string
}

interface User4 extends Address4{
  name: string,
  age: number
}

const user8: User4 = {
  name: 'Bob',
  age: 21,
  city: 'Toronto',
  state: 'Canada'
}

// Type Alias:

type Address5 = {
  city: string,
  state: string
}

type User5 = {
  name: string,
  age: number
} & Address5

const user5: User5 = {
  name: 'Sam',
  age: 22,
  city: 'Williams Town',
  state: 'England'
}

// Advanced Interfaces:
// Optional Properties and ReadOnly
interface Player {
  readonly name: string,
  score?: number
}

// type Player2 = {
//   readonly name: string,
//   score? : number
// }

const player1 : Player = {
  name: 'JON',
  score: 2
}
// const player2: Player2 = {
//   name: 'BEN',
// }

// function defined by interface
interface Add {
  (a: number, b: number) : number;
}

const add: Add = (a,b) => a+b;
console.log(add(2,2)) // Outputs 4 

// Index Signatures
interface StringDictionary {
  [key: string]: string;
}

const dictionary: StringDictionary = {
  hello: "world",
  name: "Alice",
};

// Interfaces can extend multiple interfaces:
interface A {
  propA: string;
}

interface B {
  propB: number;
}

interface C extends A, B {
  propC: boolean;
}

const obj: C = {
  propA: "Hello",
  propB: 42,
  propC: true,
};
