/*
Build a product search component. It should:

- Render a list of products from the array below
- Have a text input that filters the list by product name in real time
- Show a "No products found" message when nothing matches
- Each product card should display: name, salePrice, and an "Add to Cart" button
- The "Add to Cart" button should log "Added {product.name} to cart" to the console
*/

import { useState } from "react";

type Categories = "food" | "toys" | "habitats";

interface Product {
  id: number;
  name: string;
  originalPrice?: number;
  salePrice: number;
  inStock: boolean;
  category?: Categories;
}

const products: Product[] = [
  { id: 1, name: "Dog Food", salePrice: 39, inStock: true },
  { id: 2, name: "Cat Toy", salePrice: 15, inStock: true },
  { id: 3, name: "Fish Tank", salePrice: 150, inStock: false },
  { id: 4, name: "Dog Leash", salePrice: 25, inStock: true },
  { id: 5, name: "Cat Tree", salePrice: 89, inStock: true },
];

export default function ProductSearch() {
  const [currentList, updateCurrentList] = useState(products);
  const [searchValue, setSearchValue] = useState("");
  function search(e: React.ChangeEvent<HTMLInputElement>): void {
    const searchText = e.target.value;
    setSearchValue(searchText);
    updateCurrentList(
      // Always filter the SOURCE array, not the stateful one
      // Always use includes() for partial match, not ===
      // Always toLowerCase() both sides for case insensitivity
      products.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }
  function addToCart(name: string) {
    console.log(`Added ${name} to cart`);
  }
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-box">Search for Products</label>
        <br />
        <input
          onChange={(e) => console.log(e)}
          type="text"
          id="search-box"
          name="search-box"
          value={searchValue}
          placeholder="Searching..."
        />
        {/* <button type="submit">Search</button> */}
      </form>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {currentList.map((product) => {
          return (
            <div
              style={{ border: "solid 1px white", padding: "10px" }}
              className="card"
              key={product.id}
            >
              <h2>{product.name}</h2>
              <h3>${product.salePrice}</h3>
              <button
                onClick={() => {
                  addToCart(product.name);
                }}
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
