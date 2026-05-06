const orders = [
  {
    id: 1,
    product: "Dog Food",
    total: 39,
    status: "delivered",
    date: "2024-03-15",
  },
  {
    id: 2,
    product: "Cat Toy",
    total: 15,
    status: "cancelled",
    date: "2025-01-10",
  },
  {
    id: 3,
    product: "Fish Tank",
    total: 150,
    status: "delivered",
    date: "2025-03-22",
  },
  {
    id: 4,
    product: "Dog Leash",
    total: 25,
    status: "pending",
    date: "2023-11-05",
  },
  {
    id: 5,
    product: "Cat Tree",
    total: 89,
    status: "delivered",
    date: "2025-02-18",
  },
  {
    id: 6,
    product: "Bird Cage",
    total: 120,
    status: "pending",
    date: "2025-04-01",
  },
];

function getRecentOrders() {
  const filteredArr = orders
    .filter((item) => {
      const year = parseInt(item.date.slice(0, 4));

      if (item.status !== "cancelled" && year >= 2025) {
        return true;
      }
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return filteredArr;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
}

type ProductPreview = Pick<Product, "id" | "name" | "price">;

type ProductUpdate = Partial<Product>;

type ReadonlyProduct = Readonly<Product>;

function formatPreview({id, name, price}: Product): ProductPreview {
  return {
    id, name, price
  };
}

function updateProduct(id: number, changes: ProductUpdate): void {
  console.log(`Updating Product ${id} with ${JSON.stringify(changes)}`);
}

type ProductSummary = ProductPreview & {
  category: string;
  rating: number;
};

/*
Scenario 1: Increment the quantity of item with id 2 by 1
Scenario 2: Set inStock to true for item with id 3
Scenario 3: Update the price of item with id 1 to 45
Scenario 4: Update both quantity to 3 and inStock to false for item with id 2 in a single update
Scenario 5: Double the quantity of every item in the cart at once
*/

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
}

const cart: CartItem[] = [
  { id: 1, name: "Dog Food", price: 39, quantity: 2, inStock: true },
  { id: 2, name: "Cat Toy", price: 15, quantity: 1, inStock: true },
  { id: 3, name: "Fish Tank", price: 150, quantity: 1, inStock: false },
];

function setCartS1(cart: CartItem[]):CartItem[] {
  return cart.map((item) => item.id === 2 ? {...item, quantity: item.quantity + 1}:item);
}

function setCartS2(cart: CartItem[]) {
  return cart.map((item) => item.id === 3 ? {...item, inStock: true}:item);
}

function setCartS3(cart: CartItem[]) {
  return cart.map((item) => item.id === 1 ? {...item, price: 45}: item);
}

function setCartS4(cart: CartItem[]){
  return cart.map((item) => item.id === 2 ? {...item, inStock: false, quantity: 3} : item)
}
function setCartS5(cart: CartItem[]){
  return cart.map((item) => ({...item, quantity: item.quantity * 2}));
}
console.log('Original Cart', cart)
console.log(setCartS1(cart));
console.log(setCartS2(cart));
console.log(setCartS3(cart));
console.log(setCartS4(cart));
console.log(setCartS5(cart));


function fetchProduct(id) {
  return Promise.resolve({ id, name: "Dog Food", price: 39 });
}

function fetchReviews(id) {
  return Promise.resolve([
    { user: "Alice", rating: 5, comment: "Great!" },
    { user: "Bob", rating: 4, comment: "Good value" },
  ]);
}

function fetchRecommended(id) {
  return Promise.resolve([
    { id: 2, name: "Cat Toy", price: 15 },
    { id: 3, name: "Dog Leash", price: 25 },
  ]);
}



async function loadProductPage(id){
  try {
    const [product, reviews, recommended] = await Promise.all([fetchProduct(id), fetchReviews(id), fetchRecommended(id)]);
  return {
    product,
    reviews,
    recommended
  }
  } catch (error) {
    return null;
  }
  
}


async function loadProductPageSafe(id){
    const [productResult, reviewsResult, recommendedResult] = await Promise.allSettled([fetchProduct(id), fetchReviews(id), fetchRecommended(id)]);
  return {
    product: productResult.status === 'fulfilled' ? productResult.value : null,
    reviews: reviewsResult.status === 'fulfilled' ? reviewsResult.value : null,
    recommended: recommendedResult.status === 'fulfilled' ? recommendedResult.value : null
  }
  
  
}