console.log('Hello World')


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