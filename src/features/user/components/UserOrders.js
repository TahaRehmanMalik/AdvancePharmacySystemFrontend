import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders } from '../userSlice';
import { discountPrice } from '../../../app/constants';


export default function UserOrders() {

  const dispatch = useDispatch();
  const userInfo=useSelector(selectUserInfo);
  const orders=useSelector(selectUserOrders);

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync())
  },[dispatch])
  return (
    <div>
      {
         orders && orders.map((order)=>(
         <div>
          
          <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-purple-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-purple-900">Order#{order.id}</h1>
       <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">Order Status : {order.status}</h3>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-purple-200">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-purple-200">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-purple-900">
                                      <h3>
                                        <a href={item.product.id}>{item.product.name}</a>
                                      </h3>
                                      <p className="ml-4">Rs:{discountPrice(item.product)}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-purple-500">
                                    <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-purple-900">
                                    Qty: {item.quantity}
                                     </label>
                                     
                                    </div>

                                
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    <div className="border-t border-purple-400 px-4 py-6 sm:px-6">
                      <div className="flex justify-between my-2 text-base font-medium text-purple-900">
                        <p>Subtotal</p>
                        <p>Rs:{order.totalAmount}</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-purple-900">
                        <p>Total Items in a Cart</p>
                        <p>{order.totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-purple-500">Shipping Address:</p>
                      <div className='flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-purple-400'>
          <div className="flex min-w-0 gap-x-4"  >
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-purple-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-purple-500">{order.selectedAddress.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-purple-500">{order.selectedAddress.pinCode}</p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-purple-900">Phone:{order.selectedAddress.phone}</p>
            <p className="text-sm leading-6 text-purple-500">{order.selectedAddress.city}</p>
          </div>
        </div>
                    </div>
    </div> 
     
         </div>
        ))
      }
    
    </div>
  );
}
