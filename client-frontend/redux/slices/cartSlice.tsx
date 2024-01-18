import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface CartState {
    cartItems: Product[];
    loading: boolean;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  }

const initialState: CartState = {
  cartItems: [] as Product[], // or cartItems: Array<Product>(),
  loading: true,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: {},
  paymentMethod: "",
};

// const initialState = Cookies.get("cart")
//   ? { ...JSON.parse(Cookies.get("cart")!), loading: true } // work on this cart!
//   : {
//       cartItems: [] as Product[], // or cartItems: Array<Product>(),
//       loading: true,
//       itemsPrice: 0,
//       shippingPrice: 0,
//       taxPrice: 0,
//       totalPrice: 0,
//       shippingAddress: {},
//       paymentMethod: "",
//     };

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );

      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.productId !== action.payload
      );

      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );
      Cookies.set("cart", JSON.stringify(state));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
