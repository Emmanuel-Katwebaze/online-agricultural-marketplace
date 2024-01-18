import ProductItem from "@/components/ProductItem";
import Head from "next/head";
import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:8082/api/products", {
    next: { revalidate: 3 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const products = await getData();

  console.log(products);

  // return (
  //   <div>
  //     <Head>
  //       <title>Your Agri Marketplace</title>
  //       <meta name="description" content="Your description here" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     {/* Navigation */}
  //     <nav className="bg-green-500 p-4">
  //       <div className="container mx-auto flex justify-between items-center">
  //         <div className="text-white">
  //           <span className="text-2xl font-bold">Your Logo</span>
  //         </div>
  //         <div className="flex space-x-4">
  //           <a href="#" className="text-white">
  //             Home
  //           </a>
  //           <a href="#" className="text-white">
  //             Products
  //           </a>
  //           <a href="#" className="text-white">
  //             About Us
  //           </a>
  //           <a href="#" className="text-white">
  //             Contact
  //           </a>
  //         </div>
  //       </div>
  //     </nav>

  //     {/* Hero Section */}
  //     <header className="relative bg-blue-500 h-screen flex items-center justify-center text-white">
  //       {/* Replace the existing text with an Image component */}
  //       <Image
  //         src="/hero-image.jpeg" // Replace with the path to your hero image
  //         alt="Hero Image"
  //         layout="fill"
  //         objectFit="cover"
  //         quality={100}
  //       />

  //       {/* Overlay text on top of the image */}
  //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
  //         <h1 className="text-4xl font-bold mb-4">
  //           Welcome to Your Agri Marketplace
  //         </h1>
  //         <p className="text-lg">
  //           Discover fresh and quality agricultural products.
  //         </p>
  //       </div>
  //     </header>

  //     {/* Product Showcase */}
  //     <section className="p-8 flex justify-center">
  //       <div className="max-w-screen-lg">
  //         <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //           {data.map((product: any) => (
  //             <div
  //               key={product.productId}
  //               className="bg-white p-4 rounded-md shadow-md"
  //             >
  //               <Image
  //                 src={`/${product.imageUrl}`}
  //                 alt={product.name}
  //                 width={1000}
  //                 height={670}
  //                 className="mb-4 w-full h-32 object-cover rounded-md"
  //               />
  //               <h3 className="text-lg font-bold mb-2">{product.name}</h3>
  //               <p className="text-gray-600">{product.description}</p>
  //               <div className="mt-4 flex justify-between items-center">
  //                 <span className="text-green-500 font-bold">
  //                   shs.{product.price}
  //                 </span>
  //                 <button className="bg-green-500 text-white px-4 py-2 rounded-md">
  //                   Add to Cart
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>

  //     {/* Footer */}
  //     <footer className="bg-gray-200 p-8 text-center">
  //       {/* Your footer content goes here */}
  //       <p>&copy; 2024 Your Agri Marketplace. All rights reserved.</p>
  //     </footer>
  //   </div>
  // );

  return <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {products.map((product: Product)=>(
      <ProductItem key={product.productId} product={product} />
    ))}
  </div>;
}
