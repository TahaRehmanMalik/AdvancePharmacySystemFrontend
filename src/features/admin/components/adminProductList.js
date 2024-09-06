import React, { useState,Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import {
  fetchCategoriesAsync,
  fetchManufecturersAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectCategories,
  selectManufecturers,
  selectTotalItems,
   
} from '../../product-list/productSlice';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {  FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE, discountPrice } from '../../../app/constants';

export default function AdminProductList() {
  const dispatch = useDispatch();
  const products=useSelector(selectAllProducts);
  const categories=useSelector(selectCategories);
  const manufacturers=useSelector(selectManufecturers);
  const totalItems=useSelector(selectTotalItems);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter,setFilter]=useState({});
  const [page,setPage]=useState(1);


  const filters = [
    {
      id: 'manufacturer',
      name: 'Manufacturer',
      options: manufacturers
    },
    {
      id: 'category',
      name: 'Category',
      options:categories
    },
    
  ]


  const handleFilter=(e,section,option)=>{
    console.log(e.target.checked);
     const newFilter={...filter};
  
    if(e.target.checked)
  {
    if(newFilter[section.id])
    {
      newFilter[section.id].push(option.value);
    }
    else{
      newFilter[section.id]=[option.value];
    }
      
    }
    else{
      const index=newFilter[section.id].findIndex(el=>el===option.value)
      newFilter[section.id].splice(index,1);
    }
   console.log({newFilter});
    setFilter(newFilter);
}
const handlePage=(page)=>{
  console.log({page});
setPage(page);
}

useEffect(()=>{
  setPage(1);
},[totalItems]);

 useEffect(()=>{
  dispatch(fetchCategoriesAsync())
  dispatch(fetchManufecturersAsync())
 },[])

  useEffect(()=>{
    const pagination={_page:page,_limit:ITEMS_PER_PAGE}
 dispatch(fetchProductsByFiltersAsync({filter,pagination,admin:true}))
  },[dispatch,filter,page])

  return (
    <div>
      <div>
      <div className="bg-white">
      <div>
        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters}
        handleFilter={handleFilter}>

        </MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-purple-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-purple-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                 
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-purple-400 hover:text-purple-500 sm:ml-7">
                <span className="sr-only">View grid</span>
              
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-purple-400 hover:text-purple-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
           
             <DesktopFilter handleFilter={handleFilter} filters={filters}></DesktopFilter>
            
          
           
              <div className="lg:col-span-3">
                <div>
                  <Link
                    to="/admin/product-form"
                    className="rounded-md mx-10 my-5 bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    Add New Product
                  </Link>
                </div>
                  <ProductGrid products={products}></ProductGrid>
                </div>
               
            </div>
          </section>
          

      <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems}></Pagination>
 
        </main>
      </div>
    </div>
       
      </div>
    </div>
  );
}

function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen,handleFilter,filters}){
 
return(
  <Transition.Root show={mobileFiltersOpen} as={Fragment}>
  <Dialog as="div" className="relative z-40 lg:hidden " onClose={setMobileFiltersOpen}>
    <Transition.Child
      as={Fragment}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
    </Transition.Child>

    <div className="fixed inset-0 z-40 flex">
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-purple-900">Filters</h2>
            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-purple-400"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

       
          <form className="mt-4 border-t border-purple-200">
            {filters.map((section) => (
              <Disclosure as="div" key={section.id} className="border-t border-purple-200 px-4 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-purple-400 hover:text-purple-500">
                        <span className="font-medium text-purple-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
  
                              className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-purple-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </form>
        </Dialog.Panel>
      </Transition.Child>
    </div>
  </Dialog>
</Transition.Root>
)
}
function DesktopFilter({handleFilter,filters}){
  return(
    <form className="hidden lg:block">

    {filters.map((section) => (
      <Disclosure as="div" key={section.id} className="border-b border-purple-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-purple-400 hover:text-purple-500">
                <span className="font-medium text-purple-900">{section.name}</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onChange={e=>handleFilter(e,section,option)}
                      className="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-purple-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ))}
  </form>
  )
}
function Pagination({page,setPage,handlePage,totalItems}){
  const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE);
  return(
    <div className="flex items-center justify-between border-t border-purple-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
         onClick={e=>handlePage(page>1?page-1:page)}
          className="relative inline-flex items-center rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
        >
          Previous
        </div>
        <div
         onClick={e=>handlePage(page<totalPages?page+1:page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-purple-300 bg-white px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-purple-700">
            Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{page*ITEMS_PER_PAGE>totalItems?totalItems:page*ITEMS_PER_PAGE}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div
              onClick={e=>handlePage(page>1?page-1:page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-purple-300 hover:bg-purple-400 hover:text-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({length:totalPages}).map((el,index)=>
            (
              <div key={index}
            onClick={e=>handlePage(index+1)}
              aria-current="page"
              className={`relative z-10 cursor-pointer inline-flex items-center${index+1===page?' bg-purple-600 text-white':' text-purple-400'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600`}
            >
              {index+1}
            </div>
            )
            )}
            
            
            <div
               onClick={e=>handlePage(page<totalPages?page+1:page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-purple-300 hover:bg-purple-400 hover:text-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
     </div>
    ); 
}
function ProductGrid({products}){
  return(
   
   <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          
          {products.map((product) => (
            <div key={product.id}>
           <Link to={`/admin/product-detail/${product.id}`} >
           <div className="group relative p-2 border-solid border-2 border-purple-800 transform hover:scale-110 transition-transform duration-300 ease-in-out">
              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-purple-200 lg:aspect-none group-hover:opacity-75 lg:h-60 ">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="border-t border-purple-400 px-2 py-2 sm:px-2">
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-purple-700">
                    <div href={product.thumbnail}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </div>
                  </h3>
                  <p className="mt-1 text-sm text-purple-700">{product.form}</p>
                  <p className="mt-1 text-sm text-purple-700">PackSize:{product.packSize}</p>
                </div>
                <div>
                <p className="text-sm font-medium text-purple-900">Rs {discountPrice(product)}</p>
                <p className="text-sm font-medium line-through text-red-400">Rs {product.price}</p>
                </div>
                
              </div>
              </div>
              
             {product.deleted &&<div>
               <p className='text-sm text-red-500'>product deleted</p>
              </div>}
              {product.stock<=0 &&
                <div>
                 <p className='text-sm text-red-400'>out of Stock</p> 
              </div>}
            </div>
            </Link>
            <div className="mt-7">
                <Link
                  to={`/admin/product-form/edit/${product.id}`}
                  className="rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Edit Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) 
}