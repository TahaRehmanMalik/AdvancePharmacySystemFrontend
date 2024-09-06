import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByFilters,fetchCategories,fetchManufecturers,fetchProductById,createProduct,updateProduct } from './productAPI';

const initialState = {
  products: [],
  manufecturers:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null
};

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,pagination,admin}) => {
    const response = await fetchProductsByFilters(filter,pagination,admin);
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchManufecturersAsync = createAsyncThunk(
  'product/fetchManufecturers',
  async () => {
    const response = await fetchManufecturers();
    return response.data;
  }
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

       .addCase(fetchManufecturersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchManufecturersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.manufecturers = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex(item=>item.id===action.payload.id);
        state.products[index]=action.payload;
        state.selectedProduct = action.payload;
      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectProductById= (state) => state.product.selectedProduct;
export const selectManufecturers = (state) => state.product.manufecturers;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
