import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    discount:0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;  
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        }
      }
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload; 
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity,applyDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;
