import { products } from './../../data/products';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [] as any,
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1,
  grandTotal: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    updateQuantity: (state, action) => {
      const product = state.products.map((product: any) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === 'increment') {
            product.quantity += 1;
          } else if (action.payload.type === 'decrement') {
            product.quantity -= 1;
          }
        }
        return product;
      });
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = selectTotalPrice(state);
      state.tax = selectTax(state);
      state.grandTotal = selectGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const setSelectedItems = (state) => {
  return state.products.reduce((total, product) => {
    return Number(total + product.quantity);
  }, 0);
};

export const selectTotalPrice = (state: any) => {
  return state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
  }, 0);
};

export const selectTax = (state: any) => {
  return selectTotalPrice(state) * state.taxRate;
};

export const selectGrandTotal = (state: any) => {
  return selectTotalPrice(state) + selectTotalPrice(state) * state.taxRate;
};

export const { addToCart, updateQuantity, clearCart, removeFromCart } =
  CartSlice.actions;
export default CartSlice.reducer;
