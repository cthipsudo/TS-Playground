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

function formatPreview(prod: Product): ProductPreview {
  return {
    id: prod.id,
    name: prod.name,
    price: prod.price,
  };
}

function updateProduct(id: number, changes: ProductUpdate): void {
  console.log(`Updating Product ${id} with ${JSON.stringify(changes)}`);
}

type ProductSummary = ProductPreview & {
  category: string;
  rating: number;
};
