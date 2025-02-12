import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from "react-hook-form";
export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo=useSelector(selectUserInfo);
  const [selectedEditIndex,setSelectedEditIndex]=useState(-1);
  const { register, handleSubmit,reset,setValue,formState: { errors } } = useForm();

console.log("the userInfo is",userInfo);
  const handleEdit=(addressUpdate,index)=>{
    const newUser={...userInfo,addresses:[...userInfo.addresses]};  
    newUser.addresses.splice(index,1,addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  }
  const handleRemove=(e,index)=>{
    const newUser={...userInfo,addresses:[...userInfo.addresses]};  
    newUser.addresses.splice(index,1);
    dispatch(updateUserAsync(newUser))
    }
    const handleEditForm=(index)=>{
      setSelectedEditIndex(index);
      const address=userInfo.addresses[index];
      setValue('name',address.name);
      setValue('email',address.email);
      setValue('city',address.city);
      setValue('state',address.state);
      setValue('pinCode',address.pinCode);
      setValue('phone',address.phone);
      setValue('street',address.street);
    }
   
  return (
    
     <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-purple-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-purple-900">
            
              Name:{userInfo.username}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Email Address:{userInfo.email}
            </h3>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              role:{userInfo.role}
            </h3>
          </div>

          <div className="border-t border-purple-200 px-4 py-6 sm:px-6">


          {userInfo.role==='admin'?null:<p className="mt-0.5 text-sm text-purple-700">
          Your Address:
            </p>}
            {userInfo.addresses.map((address,index)=>(
              <div>
    {selectedEditIndex===index?<form noValidate className='bg-white px-5 py-5 mt-12' onSubmit={handleSubmit((data)=>{
           console.log(data);
          handleEdit(data,index);
           reset();    
          })}>
      <div className="space-y-12" key={index} >
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
                  {...register('name',{required:'name is required'})}
                 
                  id="name"
                  autoComplete="name"
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
                 {...register('email',{required:'email is required'})}
                 
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
                 {...register('phone',{required:'phone is required'})}
               
                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-purple-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:' street name is required'})}
                  
                  id="street"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 ">
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-purple-900">
          City
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("city",{required:"city name is required"})}
            id="city"
            autoComplete="city"
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
                  {...register('state',{required:' state is required'})}
                 
                  id="state"
                  autoComplete="state"
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
                  {...register('pinCode',{required:' pinCode is required'})}
                 
                  id="pinCode"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={(e)=>setSelectedEditIndex(-1)}
          type="submit"
          className="rounded-md bg-purple-900 text-white  px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          Cancel 
        </button>
        <button
          type="submit"
          className="rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          Edit Address
        </button>
      </div>
      </div>
      </form>:null}
             {userInfo.role==='admin'?null: <div className="flex justify-between gap-x-6 my-2 px-5 py-5 border-solid border-2 border-purple-500">
              <div className="flex min-w-0 gap-x-4">
            
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-purple-900">{address.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-purple-500">{address.street}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-purple-500">{address.pinCode}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-purple-900">Phone:{address.phone}</p>
                <p className="text-sm leading-6 text-purple-500">{address.city}</p>
              
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <button
                onClick={(e)=>handleEditForm(index)}
                type="button"
                className="font-medium text-purple-900 hover:text-purple-700">
                 Edit
                </button>
                <button
                onClick={(e)=>handleRemove(e,index)}
                type="button"
                className="font-medium text-purple-900 hover:text-purple-700">
                  Remove
                </button>
              
              </div>
            </div>}
            </div>
            ))}
            
          </div>
        </div>
           </div>
  
  );
}
