/*
- Render the product list below
- Clicking "Add to Cart" adds the product to a cart state
- Clicking "Add to Cart" on a product already in the cart increments its quantity instead of adding a duplicate
- Render a cart summary section that shows each cart item with its name, quantity, and total price (price × quantity)
- Show a "Cart is empty" message when nothing has been added
- Add a "Remove" button next to each cart item that removes it entirely from the cart
*/

import { useState } from "react";

const products = [
  { id: 1, name: "Dog Food", price: 39 },
  { id: 2, name: "Cat Toy", price: 15 },
  { id: 3, name: "Fish Tank", price: 150 },
  { id: 4, name: "Dog Leash", price: 25 },
];

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

function CartItemCard({ item, onRemove }: CartItemProps) {
  return (
    <li key={item.id}>
      {item.name} : {item.quantity} - ${item.quantity * item.price}
      <button
        onClick={() => {
          onRemove(item.id);
        }}
      >
        X
      </button>
    </li>
  );
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  function addToCart(id: number) {
    setCart((initCart: CartItem[]) => {
      const product = products.find((product) => product.id === id);
      if (!product) return initCart;
      const cartItem = { ...product, quantity: 1 };
      const existingItem = initCart.find((item) => item.id === cartItem.id);
      console.log(initCart);
      console.log("existing item:", existingItem);
      if (existingItem) {
        return initCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...initCart, cartItem];
      }
    });
  }
  function removeFromCart(id: number) {
    setCart(cart.filter((item) => item.id !== id));
  }
  return (
    <>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <button
                onClick={() => {
                  addToCart(product.id);
                }}
              >
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <h1>Our Shopping cart:</h1>
        <ul>
          {cart.length === 0
            ? "cart is empty..."
            : cart.map((item: CartItem) => {
                return (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                  />
                );
              })}
        </ul>
      </div>
    </>
  );
}
