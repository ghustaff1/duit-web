import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";

export const fetchFarms = createAsyncThunk(
  'farms/fetchFarms',
  async () => {
    const { data, error } = await supabase
      .from('farms')
      .select();

       return data;

  }
)

const initialState = {
  farms: [],
};

const farmsSlice = createSlice({
  name: 'farms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFarms.fulfilled, (state, action) => {
      action.payload.forEach(farm => {
        state.farms.push({
          cat_title: farm.cat_title,
          title: farm.title,
          descr: farm.descr
        })
      });

      console.log('farms in redux', current(state))
    });

    builder.addCase(fetchFarms.rejected, (state, action) => {
      console.log('Could not fetch farms');
      state.farms=action.payload.error;
    })
  }
});

export default farmsSlice.reducer;
