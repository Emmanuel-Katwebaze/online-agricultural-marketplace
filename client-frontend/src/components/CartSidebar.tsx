import React from "react";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const addToCartHandler = (product: Product, quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const pathname = usePathname();

  return (
    <div
      className={
        loading
          ? ""
          : cartItems.length > 0 &&
            (pathname === "/" || pathname.indexOf("/product") > 0)
          ? "fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-gary-700 overflow-scroll"
          : "hidden"
      }
    >
      {loading ? (
        <div className="py-5 px-2">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2">Cart is empty</div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-gary-600">
            <div>subtotal</div>
            <div className="font-bold text-orange-700">shs. {itemsPrice}</div>
            <div>
              <Link
                href="/cart"
                className="w-full text-center p-1  rounded-2xl border-2"
              >
                Go to cart
              </Link>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="p-2 flex flex-col items-center border-b border-b-gary-600"
              >
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
                </Link>
                {/* <select
            value={item.quantity} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
              {[...Array(item.quantity).keys()].map((x) => (
                   <option key={x + 1} value={x + 1}>
                     {x + 1}
                   </option>
                 ))}
            </select> */}
                {/* 
            The above gave me this error; 
            Type 'IterableIterator<number>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
            Which is solved by going to the tsconfig.json and ;
            {
              "compilerOptions": {
                "target": "es2015",
                "downlevelIteration": true
              }
            }
            */}
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    addToCartHandler(item, Number(e.target.value))
                  }
                >
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
                <button
                  className="default-button mt-2"
                  onClick={() => removeFromCartHandler(item.productId)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
