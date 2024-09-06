import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import {
  loginUserAsync, selectError, selectLoggedInUser
  
} from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
export default function Login() {

  const dispatch = useDispatch();
  const [isShowPassword,setIsShowPassword]=useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const error=useSelector(selectError);
  const user=useSelector(selectLoggedInUser)
  console.log(errors);


  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
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
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(data =>{
             dispatch(loginUserAsync({username:data.username,email:data.email,password:data.password}))
            console.log(data);
            
             }  )}>

<div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                UserName
              </label>
              <div className="mt-2">
                <input
                 id="name"
                 {...register("name", {
                   required: "name is required",
                   pattern: {
                     value: /^[a-zA-Z0-9_.-]+$/,
                     message: "Invalid name format",
                   },
                  })}
                  type="text"
                  autoComplete="name"
      
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
                <div className="text-sm">
                  <Link to='/forget-password' className="font-semibold text-purple-600 hover:text-purple-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <div className='relative'>
              <input
                  id="password"
                  {...register("password",{ required: "password is required"})}
                  type={isShowPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 <span className="absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer">
              <img className='w-10 h-6' src={isShowPassword?'/eye-open.png':'/eye-close.png'} alt='icon' onClick={showPassword} ></img>
            </span>
            </div>
                {errors.password&&<p className='text-red-500'>{errors.password.message}</p>}
                {error&&<p className='text-red-500'>{error||error.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-purple-900 hover:text-purple-500">
              Create An Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
