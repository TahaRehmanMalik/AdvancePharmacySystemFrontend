import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder,fetchAllOrders,updateOrder,fetchAllDeliveredOrders} from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
  totalOrders:0,
  totalDeliveredCount: 0,
  totalPendingCount:0
};
// we may need more info of current Order
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);



export const fetchAllDeliveredOrdersAsync = createAsyncThunk(
  'order/fetchAllDeliveredOrders',
  async () => {
    try {
      const response = await fetchAllDeliveredOrders();
      
      // Convert the object into an array
      const ordersArray = Object.keys(response.data).map(key => response.data[key]);

      const deliveredOrders = ordersArray.filter(order => order.status === 'delivered');
      const pendingOrders = ordersArray.filter(order => order.paymentStatus === 'pending');

      console.log('Delivered Orders:', deliveredOrders);

      return { data: { deliveredOrders, pendingOrders, totalDeliveredCount: deliveredOrders.length,  totalPendingCount: pendingOrders.length } };
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   resetOrder:(state)=>{
    state.currentOrder=null;
   }
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
        state.totalOrders=action.payload.totalOrders;
  
      })
 
         
      .addCase(fetchAllDeliveredOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDeliveredOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.totalDeliveredCount = action.payload.data.totalDeliveredCount;
        state.totalPendingCount = action.payload.data.totalPendingCount; 
      })
      
      .addCase(fetchAllDeliveredOrdersAsync.rejected, (state,action) => {
        state.status = 'failed';
        console.error('Error fetching delivered orders:', action.error);
      
      })   


      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(order=>order.id===action.payload.id);
        state.orders[index]=action.payload;      
  
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder =(state)=>state.order.currentOrder;
export const selectOrders =(state)=>state.order.orders;
export const selectTotalOrders =(state)=>state.order.totalOrders;
export const selectTotalDeliveredCount =(state)=>state.order.totalDeliveredCount;
export const selectTotalPendingCount =(state)=>state.order.totalPendingCount;

export default orderSlice.reducer;
