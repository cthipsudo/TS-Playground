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