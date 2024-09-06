import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser, fetchLoggedInUser } from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async () => {
    const response = await fetchLoggedInUserOrders()
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser ',
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userInfo.orders= action.payload;
    })
    .addCase(updateUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.userInfo= action.payload;
    })
    .addCase(fetchLoggedInUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      
      state.userInfo = action.payload;
    });
  },
});

export const selectUserOrders = (state)=>state.user.userInfo.orders;
export const selectUserInfo = (state)=>state.user.userInfo;
export const { increment } = userSlice.actions;

export default userSlice.reducer;
