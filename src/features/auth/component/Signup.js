import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import {
  
  createUserAsync,
  selectLoggedInUser
} from '../authSlice';
import { Link,Navigate } from 'react-router-dom';
export default function Signup() {
  const dispatch = useDispatch();
  const [password,setPassword]=useState(false);
  const [icon,setIcon]=useState(false);
  const user=useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors)

  const showData = () => {
    setPassword(!password);
  };
  const showPasswordData=()=>{
    setIcon(!icon);
  }
  return (
    <>
         {user&&<Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(data =>{
            dispatch(createUserAsync({username:data.username,email:data.email,
              password:data.password,
              addresses:[],
              role:'user'  
            }))
            console.log(data);
            
             }  )}>

              <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                UserName
              </label>
              <div className="mt-2">
                <input
                 id="username"
                 {...register("username", {
                   required: "username is required",
                   pattern: {
                     value: /^[a-zA-Z0-9_.-]+$/,
                     message: "Invalid username format",
                   },
                  })}
                  type="text"
                  autoComplete="username"
      
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.username&&<p className='text-red-500'>{errors.username.message}</p>}
              </div>
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{ required: "email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:"email is invalid"},})}
                  type="email"
                  autoComplete="email"
      
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 {errors.email&&<p className='text-red-500'>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
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
                  type={password?'text':'password'}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer">
              <img className='w-10 h-6' src={password?'/eye-open.png':'/eye-close.png'} alt='icon' onClick={showData} ></img>
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
                  type={icon?'text':'password'}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 <span className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer">
              <img className='w-10 h-6' src={icon?'/eye-open.png':'/eye-close.png'} alt='icon' onClick={showPasswordData} ></img>
            </span>
            </div>
               {errors.confirmPassword&& <p className='text-red-500'>{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
               Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
