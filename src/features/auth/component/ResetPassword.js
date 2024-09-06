import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import {
  resetPasswordAsync,selectError,selectPasswordReset, selectPasswordResetStatus
  
} from '../authSlice';
import { Link } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';

export default function ResetPassword(){
  const status=useSelector(selectPasswordResetStatus)
  const dispatch = useDispatch();
  const [isShowPassword,setIsShowPassword]=useState(false);
  const [icon,setIcon]=useState(false);
  const resetPassword=useSelector(selectPasswordReset);
  const error=useSelector(selectError)
  const query  = new URLSearchParams(window.location.search);
  const token=query.get('token');
  const email=query.get('email');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const showPasswordData=()=>{
    setIcon(!icon);
  }
  return (
    <>
   <div>
   {(email&&token)?<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter New Password
          </h2>
        </div>
        <div className='my-auto '>
        {status==='loading'?
       <div className="flex flex-col justify-center items-center">
       <Grid
         height="80"
         width="80"
         color="#800080"
         ariaLabel="grid-loading"
         radius="12.5"
         wrapperStyle={{}}
         wrapperClass=""
         visible={true}
       />
     </div>
      :null}
        </div>
        

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(data =>{
           
            console.log(data);
            dispatch(resetPasswordAsync({email,token,password:data.password}))
            
            
             }  )}>
             <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 New  Password
                </label>
               
              </div>
              <div className="mt-2">
                <div className='relative'>
                <input
                  id="password"
                  {...register("password",{ required: "password is required",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message:`- at least 8 characters\n
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                  - Can contain special characters`,
                }})}
                type={isShowPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  <span className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer">
                  <img className='w-10 h-6' src={isShowPassword?'/eye-open.png':'/eye-close.png'} alt='icon' onClick={showPassword} ></img>
                  </span>
                </div>
               
                {errors.password&&<p className='text-red-500'>{errors.password.message}</p>}
                
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <div className='relative'>
                <input
                  id="confirmPassword"
                  {...register("confirmPassword",{ required:"confirmPassword is required",
                  validate: (value, formValues) => value === formValues.password||'password is not matching'
    
                })}
                type={icon ?"text" : "password"}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer">
                <img className='w-10 h-6' src={icon?'/eye-open.png':'/eye-close.png'} alt='icon' onClick={showPasswordData} ></img>
                  </span>
                </div>
                
               {errors.confirmPassword&& <p className='text-red-500'>{errors.confirmPassword.message}</p>}
               {resetPassword&&<p className='text-green-500'>Password Reset Successfully</p>}
                {error&&<p className='text-red-500'>{error}</p>}
              </div>
            </div>

            

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{' '}
            <Link to="/login" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Login
            </Link>
          </p>
        </div>
      </div>:<p>Incorrect Link</p>}
   </div>
  
    </>
  );
}
