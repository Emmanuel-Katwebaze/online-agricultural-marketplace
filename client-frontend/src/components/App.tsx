"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import CartSidebar from "./CartSidebar";
import { hideLoading } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { RootState } from "../../redux/store";

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { cartItems, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div>
      <div
        className={`${
          loading
            ? ""
            : cartItems.length > 0 &&
              (pathname === "/" || pathname.indexOf("/product") >= 0)
            ? "mr-32"
            : ""
        }`}
      >
        <Header />
        <main className="p-4">{children}</main>
      </div>
      <CartSidebar />
    </div>
  );
}
