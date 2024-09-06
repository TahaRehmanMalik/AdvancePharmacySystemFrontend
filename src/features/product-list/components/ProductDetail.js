import { useEffect} from 'react'


import { useSelector, useDispatch } from 'react-redux';
import {
  selectProductById,fetchProductByIdAsync, selectProductListStatus} from '../productSlice';
import { addToCartAsync,selectItems } from '../../cart/cartSlice';
import { useParams } from "react-router-dom";
import { discountPrice } from '../../../app/constants';
import { useAlert } from 'react-alert';
import { Grid } from 'react-loader-spinner';


export default function ProductDetail() {
  const product=useSelector(selectProductById);
  const dispatch=useDispatch();
  const params=useParams();
  const items=useSelector(selectItems);
  const alert=useAlert();
  const status=useSelector(selectProductListStatus)


const handleCart=(e)=>{
  e.preventDefault();
  if(items.findIndex(item=>item.product.id===product.id)<0)
  {
    console.log({items,product})
    const newItem={product:product.id,quantity:1}
    dispatch(addToCartAsync(newItem));
    
    alert.success('Item Added to the Cart');
  }
  else{
    alert.error('Item Already Added');
  }
}

useEffect(()=>{
  dispatch(fetchProductByIdAsync(params.id))
},[dispatch,params.id])


  return (
    <div className="bg-white">
      {status==="loading"?
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
      {product&&<div className="pt-0">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-6xl sm:px-6 lg:grid lg:max-w-5xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-6 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={`/${product.image[0]}`}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                 src={`/${product.image[1]}`}
                 alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`/${product.image[2]}`}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-4 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
                  src={`/${product.image[0]}`}
                  alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-purple-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          
          <div className="mt-4 lg:row-span-3 lg:mt-0">
           <h2 className="sr-only">Product information</h2>
           <p className="text-2xl tracking-tight font-medium text-purple-900"><span className=' text-purple-900' >PackSize: </span>{product.packSize}</p>
           <p className="text-2xl tracking-tight font-medium text-purple-900"> Rs: {discountPrice(product)}</p>
           <p className="text-2xl tracking-tight  line-through text-red-400">Rs: {product.price}</p>
           <button
             onClick={handleCart}
             type="submit"
             className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-900 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           >
             Add to Cart
           </button>
         </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-300 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}

            <div>
             <h2 className="text-lg font-bold text-purple-900">Description:</h2>
              
             <div className="space-y-4">
               <p className="text-base text-gray-900">{product.description}</p>
             </div>
           </div>

           <div className="mt-4">
             <h2 className="text-lg font-bold text-purple-900">Manufacturer:</h2>

             <div className="mt-2 space-y-4">
               <p className="text-lg text-gray-800">{product.manufacturer}</p>
             </div>
           </div>

           <div className="mt-4">
             <h2 className="text-lg font-bold text-purple-900">Category:</h2>

             <div className="mt-2 space-y-4 ">
               <p className="text-lg text-gray-800">{product.category}</p>
             </div>
           </div>
          </div>
        </div>
      </div>}


    </div>
  )
}

