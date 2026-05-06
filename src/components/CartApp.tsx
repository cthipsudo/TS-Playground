import { useContext, useState, createContext } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const products: Product[] = [
  { id: 1, name: "Dog Food", price: 39 },
  { id: 2, name: "Cat Toy", price: 15 },
  { id: 3, name: "Fish Tank", price: 150 },
  { id: 4, name: "Dog Leash", price: 25 },
];

const CartContext = createContext<CartContextType | null>(null);

function ProductList() {
  const context = useContext(CartContext);
  return (
    <ul>
      {products.map((item) => {
        return (
          <li key={item.id}>
            {item.name} | {item.price}
            <button
              onClick={() => {
                context?.addToCart(item.id);
              }}
            >
              Add to Cart
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function CartSummary() {
  const context = useContext(CartContext);
  return (
    <>
      <ul>
        {context?.cart.map((item) => {
          return (
            <li key={item.id}>
              {item.name} | {item.quantity} x {item.price} ={" "}
              {item.price * item.quantity}
              <button
                onClick={() => {
                  context?.removeFromCart(item.id);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <h2>
        Total:{" "}
        {context?.cart.reduce(
          (curr, item) => curr + item.price * item.quantity,
          0,
        )}
      </h2>
    </>
  );
}

export default function CartApp() {
  const [cart, updateCart] = useState<CartItem[]>([]);
  function addToCart(id: number): void {
    updateCart((current) => {
      const product = products.find((p) => p.id === id);
      if (!product) return current;
      // check if product already is in the cart
      if (current.find((item) => item.id === id)) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...current, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(id: number): void {
    updateCart((current) => current.filter((item) => item.id !== id));
  }
  return (
    <CartContext value={{ cart, addToCart, removeFromCart }}>
      <ProductList />
      <CartSummary />
    </CartContext>
  );
}
