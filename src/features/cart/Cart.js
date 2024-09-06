import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  
  deleteItemFromCartAsync,
   selectCartLoaded,
   selectItems,
   updateCartAsync,
   
} from './cartSlice';
import { Link,Navigate} from 'react-router-dom';
import { discountPrice } from '../../app/constants';
import Modal from '../common/Modal';

export default function Cart() {
  const items = useSelector(selectItems);
  const cartLoaded=useSelector(selectCartLoaded);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const[openModal,setOpenModal]=useState(null);
  const totalAmount=items.reduce((amount,item)=>discountPrice(item.product)*item.quantity+amount,0);
  const totalItems=items.reduce((total,item)=>item.quantity+total,0);

  const handleQuantity=(e,item)=>{
   dispatch(updateCartAsync({id:item.id,quantity: +e.target.value}))
  }

  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <>

    {!items.length&&cartLoaded&&<Navigate to='/'replace={true}></Navigate>}
   
    <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
  <div className="border-t border-purple-200 px-4 py-6 sm:px-6">
  <h1 className="text-4xl my-5 font-bold tracking-tight text-purple-900">Cart</h1>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-purple-200">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                    Qty
                                     </label>
                                     <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                                      <option value='1'>1</option>
                                      <option value='2'>2</option>
                                      <option value='3'>3</option>
                                      <option value='4'>4</option>
                                      <option value='5'>5</option>
                                      <option value='6'>6</option>
                                      <option value='7'>7</option>
                                      <option value='8'>8</option>
                                      <option value='9'>9</option>
                                      <option value='10'>10</option>
                                     </select>
                                    </div>

                                    <div className="flex">
                                    <Modal name={`Delete ${item.product.name}`}
                                    message="Are you sure you want to delete this Cart item?"
                                    dangerOption="Delete"
                                    cancelOption="Cancel"
                                    dangerAction={(e)=>handleRemove(e,item.id)}
                                    cancelAction={()=>setOpenModal(null)}
                                    showModal={openModal===item.id}
                                    ></Modal>
                                      <button
                                      onClick={e=>{setOpenModal(item.id)}}
                                        type="button"
                                        className="font-medium text-purple-600 hover:text-purple-500"
                                      >
                                        Remove
                                      </button>
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
                        <p>Rs:{totalAmount}</p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-purple-900">
                        <p>Total Items in a Cart</p>
                        <p>{totalItems} items</p>
                      </div>
                      <p className="mt-0.5 text-sm text-purple-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-purple-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link to='/'>
                          <button
                            type="button"
                            className="font-medium text-purple-600 hover:text-purple-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true" className='text-purple-500'> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
    </div>    
    </>
  );
}
