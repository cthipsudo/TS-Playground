import { useState } from "react";

interface QuantitySelectorProps {
  productName: string;
  maxQuantity?: number;
}

export default function QuantitySelector({
  productName,
  maxQuantity = 10,
}: QuantitySelectorProps) {
  const [currentQuantity, setQuantity] = useState<number>(1);

  function incrementQuantity() {
    setQuantity((curr) => (curr < maxQuantity ? curr + 1 : curr));
  }
  function decrementQuantity() {
    setQuantity((curr) => (curr > 1 ? curr - 1 : curr));
  }

  function resetQuantity() {
    setQuantity(1);
  }

  return (
    <>
      <button
        onClick={() => {
          console.log(`Adding ${currentQuantity} of ${productName} to cart`);
        }}
      >
        Add to Cart
      </button>
      <button onClick={resetQuantity}>Reset</button>
      <button onClick={decrementQuantity}>-</button>
      {currentQuantity}
      <button onClick={incrementQuantity}>+</button>
    </>
  );
}
