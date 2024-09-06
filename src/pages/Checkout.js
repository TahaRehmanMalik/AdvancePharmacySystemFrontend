import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  
  deleteItemFromCartAsync,
   selectItems,
   updateCartAsync,
   
} from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import { updateUserAsync } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';
import { discountPrice } from '../app/constants';
function Checkout(){
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [selectedAddress,setSelectedAddress]=useState(null);
  const [paymentMethod,setPaymentMethod]=useState('cash');
  const currentOrder=useSelector(selectCurrentOrder)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user=useSelector(selectUserInfo);
  const totalAmount=items.reduce((amount,item)=>discountPrice(item.product)*item.quantity+amount,0);
  const totalItems=items.reduce((total,item)=>item.quantity+total,0);


  const handleQuantity=(e,item)=>{
   dispatch(updateCartAsync({id:item.id,quantity: +e.target.value}))
  }

  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

 const handleAddress=(e)=>{
console.log(e.target.value);
setSelectedAddress(user.addresses[e.target.value]);
 } 
 const handlePayment=(e)=>{
  console.log(e.target.value);
  setPaymentMethod(e.target.value)
 }

 const handleOrder=()=>{
  if(selectedAddress&& paymentMethod)
  {
const order={items,
    totalAmount,
    totalItems,
    user:user.id,
    paymentMethod,
    selectedAddress,
    status:'pending'    
  
  };
  dispatch(createOrderAsync(order));
  
}
else{
  
  alert("Enter address and payment Method")
}
  
}


return (
  <>
    {!items.length&&<Navigate to='/'replace={true}></Navigate>}
  {currentOrder&& currentOrder.paymentMethod==='cash'&&<Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}

  {currentOrder&& currentOrder.paymentMethod==='card'&&<Navigate to={`/stripe-checkout/`} replace={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
        <div className="lg:col-span-3">
    <form noValidate className='bg-white px-6 py-12 mt-12'onSubmit={handleSubmit((data)=>{
      console.log(data);
      dispatch(
        updateUserAsync({...user,addresses:[...user.addresses,data]})
      )
      reset();
})}>
 <div className="space-y-12">
<div className="border-b border-purple-900/10 pb-12">
    <h2 className="text-2xl font-semibold leading-7 text-purple-900">Personal Information</h2>
    <p className="mt-1 text-sm leading-6 text-purple-600">Use a permanent address where you can receive mail.</p>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-purple-900">
          Full name
        </label>
        <div className="mt-2">
          <input
            type="text"
          {...register("name",{required:"name is required"})}
            id="name"
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>


      <div className="sm:col-span-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-purple-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            {...register("email",{required:"email is required"})}
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-purple-900">
        Phone
        </label>
        <div className="mt-2">
        <input
            id="phone"
            {...register("phone",{required:"phone is required"})}
            type="tel"
            autoComplete="phone"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="street" className="block text-sm font-medium leading-6 text-purple-900">
          Street address
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("street",{required:"street name is required"})}
            id="street"
            autoComplete="street-address"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-purple-900">
          City
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("city",{required:"city name is required"})}
            id="city"
            autoComplete="address-level2"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="state" className="block text-sm font-medium leading-6 text-purple-900">
          State / Province
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("state",{required:"state name is required"})}
            id="state"
            autoComplete="address-level1"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-purple-900">
          ZIP / Postal code
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("pinCode",{required:"pinCode name is required"})}
            id="pinCode"
            autoComplete="postal-code"
            className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="mt-6 flex items-center justify-end gap-x-6">
  <button type="button" className="text-sm font-semibold leading-6 text-purple-900">
   Reset
  </button>
  <button
    type="submit"
    className="rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
  >
    Add Address
  </button>
</div>
  <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-purple-900">Address</h2>
    <p className="mt-1 text-sm leading-6 text-purple-600">
     Choose From Existing Addresses
    </p>
    <ul role="list">
      {user.addresses.map((address,index) => (
        <li className='flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-purple-400'key={index}>
          <div className="flex min-w-0 gap-x-4"  >
          <input
          onChange={handleAddress}
              name='address'
              type="radio"
              value={index}
              className="h-4 w-4 border-purple-300 text-purple-600 focus:ring-purple-600"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-purple-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-purple-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-purple-500">{address.pinCode}</p>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-purple-900">{address.phone}</p>
            <p className="text-sm leading-6 text-purple-500">{address.city}</p>
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-10 space-y-10">
      
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-purple-900">Payment Methods</legend>
        <p className="mt-1 text-sm leading-6 text-purple-600">Choose One</p>
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-x-3">
            <input
             onChange={handlePayment}
              id="cash"
              name="payments"
              value="cash"
              checked={paymentMethod==='cash'}
              type="radio"
              className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-600"
            />
            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-purple-900">
              Cash
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
            onChange={handlePayment}
              id="card"
              name="payments"
              value="card"
              checked={paymentMethod==='card'}
              type="radio"
              className="h-4 w-4 border-purple-300 text-purple-600 focus:ring-purple-600"
            />
            <label htmlFor="card" className="block text-sm font-medium leading-6 text-purple-900">
              Card 
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</div>
</form>
</div>
<div className="lg:col-span-3">
<div className="mx-auto bg-white mt-12 max-w-7xl px-2 sm:px-2 lg:px-4">
  <div className="border-t border-gray-200 px-0 py-6 sm:px-6">
  <h1 className="text-4xl my-5 font-bold tracking-tight text-purple-900">Cart</h1>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-purple-200">
                            {items.map((item) => (
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
                                      <button
                                      onClick={(e)=>handleRemove(e,item.id)}
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

                    <div className="border-t border-purple-400 px-2 py-6 sm:px-2">
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
                        <div
                        onClick={handleOrder}
                          className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-purple-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
                        >
                        Order Now
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-purple-500">
                        <p>
                          or
                          <Link to='/'>
                          <button
                            type="button"
                            className="font-medium text-purple-600 hover:text-purple-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true" className='text-purple-300'> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
    </div>  
</div>
</div>
</div>
</>
)
}
export default Checkout;