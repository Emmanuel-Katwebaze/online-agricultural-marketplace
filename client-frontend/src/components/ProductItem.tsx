import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductRate from "./ProductRate";
import AddToCart from "./AddToCart";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="card">
      <Link href={`/product/${product.productId}`}>
        <Image
          src={`/${product.imageUrl}`}
          alt={product.name}
          width={400}
          height={400}
          className="rounded shadow object-cover h-96 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.productId}`}>
            <h2 className="text-lg">{product.name}</h2>
        </Link>
        {/* <ProductRate rate={product.rating} count={product.numReviews} /> */}
        <ProductRate rate={4.5} count={10} />
        {/* <p className="mb-2">{product.brand}</p> */}
        <p>shs. {product.price}</p>
        <AddToCart
          showQuantity={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
}
