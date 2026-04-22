// Types in Typescript:
// ====================================================================================================

// string: "Hello World"

// number: 42

// boolean: true or false

// array: number[] | "[1,2,3]" or string[] | "['hello', 'world']"

// any:
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

// Function Annotations
// ====================================================================================================
function greet(name: string) {
  console.log(`Hello ${name}`);
}

//greet(101) // returns type error

// return type annotation
function getFavoriteNumber(): number {
  return 21;
}

// Anonymous Functions:
// Parameters of the function are automatically given types:
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// Object Types:
// ====================================================================================================
// The parameter's type annotation is an object type
// The type part of each property is also optional. If you don’t specify a type, it will be assumed to be any.
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// ? specifies that the property is optional
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

// For properties that might not exist, you NEED to check if its undefined first:
function printName2(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  // 'obj.last' is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

// Union Types:
// A type that is formed by two or more other types: where the represented values could be ANY one of those types
// ====================================================================================================

function printId(id: string | number) {
  console.log("Your ID is: " + id);
}

// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 }); // Throws Error

// Typescript will only allow operations valid for every member of the union, unless you narrow it like below.
function printId2(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
// Return type is inferred as number[] | string
// we can use slice because it available to both arrays and strings
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

// Intersection Types:
// An intersection type combines multiple types into one
// ====================================================================================================
interface ArtistsData {
  artists: { name: string }[];
}
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};

// Type Alias:
// A name for any TYPE
// ====================================================================================================
// A type for a named object called Point
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord2(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

// A type for a named string called ID
type ID = number | string;

// Type Interface:
// Also another way to name an object type
// ====================================================================================================
interface Point2 {
  x: number;
  y: number;
}

function printCoord3(pt: Point2) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

// Differences Between Type Aliases and Interfaces
// Type aliases and interfaces are very similar, and in many cases you can choose between them freely.
// Almost all features of an interface are available in type, the key distinction is that a type cannot
// be re-opened to add new properties vs an interface which is always extendable.

// Type Assertions:
// you can use a type assertion to specify a more specific type
// ====================================================================================================
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
// or
const req = { url: "https://example.com", method: "GET" } as const;

// Literal Types:
// Specific strings or numbers.
// ====================================================================================================

let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
//Type '"howdy"' is not assignable to type '"hello"'.

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre"); // Throws error because centre is not an assignable type

// Numeric Literals
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
// This can be combined with non-literal types
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic"); // Throws error

// null and undefined:
// depending on if strictNullChecks is ON or OFF. If on, you need to narrow for those values before using methods or properties on that value
// ====================================================================================================

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

// Same check but with special syntax
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
