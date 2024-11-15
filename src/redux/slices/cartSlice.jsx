import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) { //action.payload={id:01, amount:3, price:123}
      state.items.push({
        ...action.payload
      });

      // console.log('payload', action.payload);
      // console.log('in addtoCart',
      //   localStorage.getItem('cartData'))

      const localStorageCartData = localStorage.getItem('cartData');

      if (localStorageCartData.length > 0) {
        console.log('adding, length>0')
        const newData = JSON.parse(localStorage.getItem('cartData'));
        newData.push(action.payload);
        localStorage.setItem('cartData', JSON.stringify(newData));
      }
      else {
        console.log('adding, length=0')
        const newData = [];
        newData.push(action.payload);
        localStorage.setItem('cartData', JSON.stringify(newData));
      }

      console.log('cartStoreData', current(state));
      console.log('localCartData', localStorage.getItem('cartData'))





    },
    removeFromCart(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload.id);

      const localStorageCartData = JSON.parse(localStorage.getItem('cartData'));

      localStorage.setItem('cartData',
        JSON.stringify(localStorageCartData.filter(obj => obj.id !== action.payload.id)));

      console.log('cartStoreData', current(state));
      console.log('localCartData', localStorage.getItem('cartData'))


      // if (localStorageCartData.length > 0) {
      //   const newData = JSON.parse(localStorage.getItem('cartData'));
      //   newData.push(action.payload);
      //   localStorage.setItem('cartData', JSON.stringify(newData));
      // }
      // else {
      //   const newData = [];
      //   newData.push(action.payload);
      //   localStorage.setItem('cartData', JSON.stringify(newData));
      // }

    },
    initializeCart(state) {
      
      if (localStorage.getItem('cartData').length > 0){
        console.log('initializing')
        state.items = JSON.parse(localStorage.getItem('cartData'));
      }
        
    }
  }
});

export const { addToCart, removeFromCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;