// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.totalAmount += action.payload.price;
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.totalAmount -= existingItem.price;
        state.totalQuantity -= 1;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
