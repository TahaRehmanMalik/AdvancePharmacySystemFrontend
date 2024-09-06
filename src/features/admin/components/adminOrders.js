import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountPrice } from "../../../app/constants";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync, fetchAllDeliveredOrdersAsync, selectTotalDeliveredCount,selectTotalPendingCount } from "../../order/orderSlice";
import {
    PencilIcon,
  } from '@heroicons/react/24/outline';
import Pagination from "../../common/pagination";



function AdminOrders(){
    const dispatch=useDispatch();
    const [page,setPage]=useState(1);
    const [delivered, setDelivered] = useState(0);
    const [received, setReceived] = useState(0);
    const [pending, setPending] = useState(0);
    const [dispatched, setDispatched] = useState(0);
    const [cancel, setCancelled] = useState(0);
    const orders=useSelector(selectOrders);
    const totalOrders=useSelector(selectTotalOrders);
    const [editableOrderId,setEditableOrderId]=useState(-1);
    const totalDeliveredCount = useSelector(selectTotalDeliveredCount);
    const totalPendingCountt = useSelector(selectTotalPendingCount);


    const handlePage=(page)=>{
        setPage(page);
        const pagination={_page:page,_limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync(pagination))
    }
    useEffect(()=>{
        const pagination={_page:page,_limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync(pagination))
    },[dispatch,page])
    const handleEdit=(order)=>{
   setEditableOrderId(order.id);
    }
    const handleUpdate=(e,order)=>{
      const updateOrder={...order,status:e.target.value};
      dispatch(updateOrderAsync(updateOrder));
      setEditableOrderId(-1);
    }

    const  handleOrderPaymentStatus=(e,order)=>{
      const updateOrder={...order,paymentStatus:e.target.value};
      dispatch(updateOrderAsync(updateOrder));
      setEditableOrderId(-1); 
      
    }
    const chooseColor=(status)=>{
     switch(status){
        case 'pending':
            return 'bg-purple-200 text-purple-600';
        case 'dispatched':
            return 'bg-yellow-200 text-yellow-600';
        case 'delivered':
            return 'bg-green-200 text-green-600';
         case 'received':
              return 'bg-green-200 text-green-600';   
        case 'cancelled':
            return 'bg-red-200 text-red-600';
        default:
            return 'bg-purple-200 text-purple-600';
     }
    }

    const Count = () => {
      let deliveredCount = 0;
      let pendingCount = 0;
      let receivedCount = 0;
      let dispatchCount=0;
      let  cancelCount=0;
      orders.forEach((order) => {
        switch (order.status) {
          case 'delivered':
            deliveredCount += 1;
            break;
          case 'pending':
            pendingCount += 1;
            break;
          case 'dispatched':
            dispatchCount += 1;
            break;
            case 'cancelled':
            cancelCount += 1;
            break;
          default:
            break;
        }
        
    if (order.paymentStatus === 'received') {
      receivedCount += 1;
    }
      });

    
     
      setPending(pendingCount);
      setDispatched(dispatchCount);
      setDelivered(deliveredCount);
      setCancelled(cancelCount);
      setReceived(receivedCount);
    };
    
    useEffect(() => {
      Count();
    }, [orders]);

    useEffect(() => {
      dispatch(fetchAllDeliveredOrdersAsync());
    }, [dispatch]);
  

    

    return (
        <>

        <div className="overflow-x-auto">
          <div className=" flex items-center justify-center font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className=" w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-0 text-left">Order Number</th>
                      <th className="py-3 px-0 text-left">Items</th>
                      <th className="py-3 px-0 text-center">Total Amount</th>
                      <th className="py-3 px-2 text-center">Shipping Address</th>
                      <th className="py-3 px-2 text-center">Order Status</th>
                      <th className="py-3 px-2 text-center">Payment Method</th>
                      <th className="py-3 px-2 text-center">Payment Status</th>

                      <th className="py-3 px-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order)=>(
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={`/${item.product.thumbnail}`}
                              alt={item.product.name}
                            />
                          </div>
                          <span>
                            {item.product.name} - #{item.quantity} - Rs:
                            {discountPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        Rs:{order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.state}, </div>
                        <div>{order.selectedAddress.pinCode}, </div>
                        <div>{order.selectedAddress.phone}, </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          
                          {order.status}
                          
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                    {order.id===editableOrderId?
                    
                    (
                        <select onChange={(e)=>handleOrderPaymentStatus(e,order)}>
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                        
                      </select>
                      ):(
                        <span className={`${chooseColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}>
                                             
                        {order.paymentStatus}
                       </span>
                        )}
                    </td>

                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform hover:text-purple-500 cursor-pointer hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                   
                  </tr>
                ))}
                   
                   
                  </tbody>
                </table>
              </div>
                   
                   <div className="mt-4">
                <h1 className="font-bold uppercase">Information of Orders page wise:</h1>
                <p className="font-bold text-purple-500">Total Pending Products on current Page: {pending}</p>
                <p className="font-bold text-purple-500">Total Disptached Products on current Page: {dispatched}</p>
                <p className="font-bold text-purple-500">Total Delivered Products on current Page: {delivered}</p>
                <p className="font-bold text-purple-500">Total cancelled Products on current Page: {cancel}</p>
                <p className="font-bold text-purple-500">Total Received payments on current Page: {received}</p>
                  { /* Display the total count of delivered products for all orders */ }
             <div className=" float-right">
             <p className="font-bold text-purple-900">Total Delivered Products (All Orders): {totalDeliveredCount}</p>
           <p className="font-bold text-purple-900">Total Pending Products (All Orders): {totalPendingCountt}</p>
              </div>     
           
            </div>

            </div> 
          </div>
        </div>
        <div>
        <Pagination page={page}
         setPage={setPage} 
         handlePage={handlePage}
          totalItems={totalOrders}></Pagination>

        </div>
      </>
      
    );
}
export default AdminOrders;