//console.log('Hello World')

/*============= Interfaces ==============*/

// the shape of the object
interface User {
  name: string;
  id: number;
}

const user: User = {
  // Type Declaration for Objects
  name: "oscar",
  id: 0,
};

interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user2: User = new UserAccount("Murphy", 1);

const message: string = "Hello World";

console.log(message);

// name, age, jobTitle, address: street, city
const personExOne: {
  name: string;
  age: number;
  jobTitle?: string;
  address: {
    street: string;
    city: string;
  };
} = {
  name: "Alice",
  age: 2,
  address: {
    street: "21 Jump Street",
    city: "Boston",
  },
};

console.log(personExOne);

// write a function that multiples a number

function multiplyTwoNumbers(numberOne: number, numberTwo: number): number {
  return numberOne * numberTwo;
}

console.log(multiplyTwoNumbers(5, 5));

const multipleTwoNumbersArrow = (numOne: number, numTwo: number): number =>
  numOne * numTwo;
console.log(multipleTwoNumbersArrow(2, 2));

// write a function with an optional parameter

function callMyParents(msg: string = "Good morning", subject?: string): string {
  return `Hey Mom & Dad, I'm calling ${subject ? `about ${subject}` : ""}. ${msg}`;
}
console.log(callMyParents());
console.log(callMyParents(`Yo what's up?`));
console.log(callMyParents(`I'm really sad`, `losing my favorite pencil`));

// void type is used to define functions that don't implictly return something.

function greetDog(): void {
  console.log(`Hi Doggie`);
}

greetDog();
