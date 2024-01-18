"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from 'next/navigation'
import { addToCart } from "../../redux/slices/cartSlice";

interface AddToCartProps {
  product: Product;
  showQuantity?: boolean;
  redirect?: boolean;
  increasePerClick?: boolean;
}

export default function AddToCart({
  product,
  showQuantity = true,
  redirect = false,
  increasePerClick = false,
}: AddToCartProps) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    let newQuantity = quantity;
    if (increasePerClick) {
      const existItem = cartItems.find(
        (x) => x.productId === product.productId
      );
      if (existItem) {
        // if (existItem.qty + 1 <= product.countInStock) {
        if (existItem.quantity + 1 <= product.quantity) {
          newQuantity = existItem.quantity + 1;
        } else {
          return alert("No more product exists");
        }
      }
    }
    dispatch(addToCart({ ...product, quantity: newQuantity }));

    if (redirect) router.push("/cart");
  };
  return (
    <>
      {/* {product.countInStock > 0 && showQty && ( */}
      {product.quantity > 0 && showQuantity && (
        <div className="mb-2 flex justify-between">
          <div>Quantity</div>
          <div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {/* {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))} */}
              {(() => {
                  const options = [];
                  for (let i = 1; i <= product.quantity; i++) {
                    options.push(
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  }
                  return options;
                })()}
            </select>{" "}
          </div>
        </div>
      )}
      <div>
        {product.quantity > 0 ? (
            <button className="primary-button w-full" onClick={addToCartHandler}>
                Add to Cart
            </button>
        ): (
            <button disabled>Out of stock</button>
        )}
      </div>
    </>
  );
}
