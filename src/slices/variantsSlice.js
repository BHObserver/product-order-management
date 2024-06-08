import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVariants } from '../services/api'; // Adjust the import path as necessary

export const fetchVariants = createAsyncThunk(
  'variants/fetchVariants',
  async (productId) => {
    const response = await getVariants(productId);
    return response.data.variants;
  },
);

const variantsSlice = createSlice({
  name: 'variants',
  initialState: { variants: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.variants = action.payload;
        state.loading = false;
      })
      .addCase(fetchVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default variantsSlice.reducer;
