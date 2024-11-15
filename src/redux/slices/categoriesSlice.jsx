import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const { data, error } = await supabase
      .from('categories')
      .select();

      return data;

  }
)


const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      action.payload.forEach(category=>{
        state.categories.push({
          path:category.path,
          title:category.title
        })
      });
      console.log('cats in redux', current(state))
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.log('Could not fetch categories')
      state.categories = action.payload.error;
    })
  }
});

// export const getPathByCategory = (category) => {
//   return '/categories/' + Object.keys(initialState.links.find(obj => Object.values(obj)[0] === category))[0];
// }
// export const getCategoryFromPath = (path) => {
//   // return '/categories/' + Object.keys(initialState.links.find(obj => Object.values(obj)[0] === category))[0];
//   // console.log(path)
//   return Object.values(initialState.links.find(obj => Object.keys(obj)[0] === path))[0];
// }

export default categoriesSlice.reducer;
