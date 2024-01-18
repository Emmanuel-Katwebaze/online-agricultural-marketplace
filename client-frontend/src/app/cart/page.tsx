"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addToCart, removeFromCart } from "../../../redux/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const addToCartHandler = async (product: Product, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };
  return (
    <div>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>

      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Product</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.productId}`}
                        className="flex items-center"
                      >
                        <Image
                          src={`/${item.imageUrl}`}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="p-1"
                        />
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {/* {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))} */}
                        {(() => {
                          const options = [];
                          for (let i = 1; i <= item.quantity; i++) {
                            options.push(
                              <option key={i} value={i}>
                                {i}
                              </option>
                            );
                          }
                          return options;
                        })()}
                      </select>
                    </td>
                    <td className="p-5 text-right">shs {item.price}</td>
                    <td className="p- text-center">
                      <button
                        className="default-button"
                        onClick={() => removeFromCartHandler(item.productId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items): shs {itemsPrice}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/shipping")}
                    className="primary-button w-full"
                  >
                    Proceed to checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
