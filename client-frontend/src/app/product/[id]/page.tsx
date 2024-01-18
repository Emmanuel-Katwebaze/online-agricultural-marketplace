import AddToCart from '@/components/AddToCart';
import ProductRate from '@/components/ProductRate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function getProduct(productId: number) {
    const res = await fetch(`http://localhost:8082/api/products/${productId}`, {
      next: { revalidate: 3 },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }

interface ProductDetailPageProps {
    params: {
        id: number
    }
}

export default async function ProductDetailPage({ params: { id }} : ProductDetailPageProps) {
    const product:Product = await getProduct(id);
    if(!product){
        return <div>Product Not Found</div>
    }
  return (
    <div>
        <div className="py-2">
            <Link href="/">back to products</Link>
        </div>
        <div className='grid md:grid-cols-4 md:gap-3'>
            <div className='md:col-span-2'>
                <Image
                src={`/${product.imageUrl}`}
                alt={product.name}
                width={640}
                height={640}
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
                />
            </div>
            <div>
                <ul>
                    <li>
                        <h1 className='text-lg'>{product.name}</h1>
                    </li>
                    <li>
                        {/* <ProductRate
                        rate={product.rating}
                        count={product.numReviews} /> */}
                        <ProductRate
                        rate={4.5}
                        count={10} />
                    </li>
                    <li>
                        <hr className='my-3' />
                        Description:
                        <p>{product.description}</p>
                    </li>
                </ul>
            </div>
            <div>
                <div className='card p-5'>
                    <div className='mb-2 flex justify-between'>
                        <div>Price</div>
                        <div>shs {product.price}</div>
                    </div>
                    <AddToCart product={product} redirect={true} />
                </div>
            </div>
        </div>
    </div>
  )
}
