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
      state.selectedItems = state.products.reduce((total, product) => {
        return Number(total + product.quantity);
      }, 0);
    },
  },
});

// export const setSelectedItems = (state) => {
//   state.products.reduce((total, product) => {
//     return Number(total + product.quantity);
//   }, 0);
// };

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
