import { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

// Bonus: union type for sort order
type SortOrder = "price-asc" | "price-desc";

interface ProductListProps {
  products: Product[];
}

const products: Product[] = [
  { id: 1, name: "Dog Food", price: 39 },
  { id: 2, name: "Cat Toy", price: 15 },
  { id: 3, name: "Fish Tank", price: 150 },
  { id: 4, name: "Dog Leash", price: 25 },
  { id: 5, name: "Cat Tree", price: 89 },
  { id: 6, name: "Bird Cage", price: 120 },
  { id: 7, name: "Dog Treats", price: 12 },
];

function ProductList({ products }: ProductListProps) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {products.map((item) => (
        <li key={item.id}>
          {item.name} | ${item.price}
        </li>
      ))}
    </ul>
  );
}

export default function ProductCatalog() {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("price-asc");

  // useMemo is worth it here because filtering and sorting are O(n log n)
  // operations. Without it they'd rerun on every render, even renders
  // unrelated to searchText or sortOrder changing.
  const filteredAndSorted = useMemo(() => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    return [...filtered].sort((a, b) =>
      sortOrder === "price-asc" ? a.price - b.price : b.price - a.price,
    );
  }, [searchText, sortOrder]);

  return (
    <>
      <form>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </form>
      <ProductList products={filteredAndSorted} />
    </>
  );
}
