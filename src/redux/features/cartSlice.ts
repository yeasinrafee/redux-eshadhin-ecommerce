import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1,
  grandTotal: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const {} = CartSlice.actions;
export default CartSlice.reducer;
