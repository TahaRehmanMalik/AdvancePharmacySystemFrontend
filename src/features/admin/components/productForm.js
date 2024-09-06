import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectCategories, selectManufecturers, selectProductById, updateProductAsync } from '../../product-list/productSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';
function ProductForm(){
  const categories=useSelector(selectCategories);
  const manufacturers=useSelector(selectManufecturers);
  const dispatch=useDispatch();
  const params=useParams();
  const selectedProduct=useSelector(selectProductById)
  const [openModal,setOpenModal]=useState(null);
  const alert=useAlert();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm();
    
      useEffect(() => {
        if (params.id) {
          dispatch(fetchProductByIdAsync(params.id));
        } 
        else{
          dispatch(clearSelectedProduct())
          
        }
      }, [params.id, dispatch]);

      useEffect(() => {
        if (selectedProduct&&params.id) {
          setValue('name',selectedProduct.name);
          setValue('form',selectedProduct.form);
          setValue('packSize',selectedProduct.packSize);
          setValue('description',selectedProduct.description);
          setValue('price', selectedProduct.price);
          setValue('discountPercentage', selectedProduct.discountPercentage);
          setValue('thumbnail',selectedProduct.thumbnail);
          setValue('image1',selectedProduct.image[0]);
          setValue('image2',selectedProduct.image[1]);
          setValue('image3',selectedProduct.image[2]);
    
          setValue('stock', selectedProduct.stock);
          setValue('manufacturer', selectedProduct.manufacturer);
          setValue('category', selectedProduct.category);
        }
      }, [selectedProduct, params.id, setValue]);

      const handleDelete=()=>{
        const product={...selectedProduct};
        product.deleted=true;
        dispatch(updateProductAsync(product));
      }
return(
    <div>
    <form noValidate onSubmit={handleSubmit((data)=>{
      const product={...data};
      product.image=[product.image1,product.image2,product.image3,product.thumbnail];
      delete product['image1']
      delete product['image2']
      delete product['image3']
      product.price=+product.price;
      product.discountPercentage=+product.discountPercentage;
      product.stock=+product.stock;
      if(params.id)
      {
         product.id=params.id;
        dispatch(updateProductAsync(product));
        alert.success("product Updated")
        reset();
      }
      else{
        dispatch(createProductAsync(product));
        alert.success("product is  Created")
       reset();
      }
      
      console.log("The new product is ",product)
    })}>
    <div className="space-y-12 bg-white p-12">

      <div className="border-b border-purple-900/10 pb-12">
        <h2 className="text-base font-bold leading-7 text-purple-900">Add Product</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {selectedProduct&&selectedProduct.deleted &&<h1 className=' text-red-500 sm:col-span-6'>This Product is deleted</h1>}
        <div className="sm:col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 ">
                  <input
                    type="text"
                    {...register('name', {
                      required: 'name is required',
                    })}
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>


            <div className="sm:col-span-6">
              <label
                htmlFor="form"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Product Form
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 ">
                  <input
                    type="text"
                    {...register('form', {
                      required: 'form name is required',
                    })}
                    id="form"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          <div className="sm:col-span-4">
            <label htmlFor="packSize" className="block text-sm font-medium leading-6 text-purple-900">
             Package Size
            </label>
            <div className="mt-2">
            <input
                id="packSize"
                {...register('packSize', {
                  required: 'packSize is required',
                })}
                type="text"
                autoComplete="packSize"
                className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description', {
                    required: 'description is required',
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-purple-300 placeholder:text-purple-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-purple-600">
                Write a few sentences about product.
              </p>
            </div>

          <div className="col-span-full">
              <label
                htmlFor="manufacturer"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Manufecturer
              </label>
              <div className="mt-2">
                <select
                  {...register('manufacturer', {
                    required: 'manufacturer is required',
                  })}
                >
                  <option value="">--choose manufacturer--</option>
                 {manufacturers.map(manufacturer=><option value={manufacturer.value}>{manufacturer.label}</option>) }
                </select>
              </div>
            </div>
           

            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register('category', {
                    required: 'category is required',
                  })}
                >
                  <option value="">--choose category--</option>
                   {categories.map(category=><option value={category.value}>{category.label}</option>) }
                </select>
              </div>
            </div> 
          
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 ">
                  <input
                    type="number"
                    {...register('price', {
                      required: 'price is required',
                      min: 1,
                      max: 10000,
                    })}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 ">
                  <input
                    type="number"
                    {...register('discountPercentage', {
                      required: 'discountPercentage is required',
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-purple-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 ">
                  <input
                    type="number"
                    {...register('stock', {
                      required: 'stock is required',
                      min: 0,
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
               
            <div className="sm:col-span-6">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-purple-900">
                 Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600">

                    <input
                      type="text"
                      {...register("thumbnail",{required: "thumbnail is required"})}
                      id="thumbnail"
                      autoComplete="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
              </div>
        
          <div className="sm:col-span-6">
                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-purple-900">
                 Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600">

                    <input
                      type="text"
                      {...register("image1",{required: "image is required"})}
                      id="image1"
                      autoComplete="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-purple-900">
                 Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600">

                    <input
                      type="text"
                      name="image2"
                      {...register("image2",{required: "image is required"})}

                      autoComplete="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-purple-900">
                 Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-purple-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600">

                    <input
                      type="text"
                      {...register("image3",{required: "image is required"})}
                      id="image3"
                      autoComplete="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-purple-900 placeholder:text-purple-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
     
      {selectedProduct && !selectedProduct.deleted && (<button
        onClick={(e)=>{e.preventDefault();setOpenModal(true)}}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Delete
      </button>)}
      <button
        type="submit"
        className="rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      >
        Save
      </button>
    </div>
  </form>
  {selectedProduct&&<Modal name={`Delete ${selectedProduct.name}`}
    message="Are you sure you want to delete this product?"
    dangerOption="Delete"
    cancelOption="Cancel"
    dangerAction={handleDelete}
    cancelAction={()=>setOpenModal(null)}
    showModal={openModal}
    ></Modal>
      }
  </div>
)
}
export default ProductForm;