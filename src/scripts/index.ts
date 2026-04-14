console.log('Hello World')

/*============= Interfaces ==============*/

// the shape of the object
interface User {
  name: string;
  id: number;
}


const user: User = { // Type Declaration for Objects
  name: "oscar",
  id: 0,
};

console.log(user);

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

console.log(user2)

const message: string = 'Hello World';

console.log(message);
console.log(Math.floor(11.2))

// name, age, jobTitle, address: street, city
const personExOne: {
  name: string;
  age: number;
  jobTitle?: string;
  address: {
    street: string;
    city: string
  };
} = {
  name: 'Alice',
  age: 2,
  address : {
    street: "21 Jump Street",
    city: "Boston"
  }
}


console.log(personExOne);
