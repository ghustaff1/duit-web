import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList(state, action) { //action.payload={id:01
      state.items.push(action.payload);

    },
    removeFromWishlist(state, action) { //action.payload={}
      state.items = state.items.filter(obj => obj.id !== action.payload.id);
    },
  }
});

export const { addToWishList, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;