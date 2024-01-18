type Product = {
    productId: number;
    category: {
      categoryId: number;
      name: string;
      description: string;
    };
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    dateAdded: string;
  };

type Category = {
    categoryId: number;
    name: string;
    description: string;
}

type ShippingAddress = {
  fullName?: string,
  address?: string,
  city?: string,
  postalCode?: string,
  country?: string
}
