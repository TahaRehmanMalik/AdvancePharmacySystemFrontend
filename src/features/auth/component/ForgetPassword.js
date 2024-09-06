import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import {
  resetPasswordRequestAsync, selectMailListStatus, selectMailSent
  
} from '../authSlice';
import { Link } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
export default function ForgetPassword() {

  const status=useSelector(selectMailListStatus)
  const mailSent=useSelector(selectMailSent)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors)
  return (
    <>
  
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter Email to reset Password
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
            dispatch(resetPasswordRequestAsync(data.email))
            
            
             }  )}>
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
                 {mailSent&&<p className='text-green-500'>Mail Sent</p>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{' '}
            <Link to="/login" className="font-semibold leading-6 text-purple-900 hover:text-purple-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
