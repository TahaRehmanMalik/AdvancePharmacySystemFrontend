import React, { useState,Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CarouselList from '../carousel';
import {
 
  fetchCategoriesAsync,
  fetchManufecturersAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectCategories,
  selectManufecturers,
  selectProductListStatus,
  selectTotalItems,
   
} from '../productSlice';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE, discountPrice } from '../../../app/constants';
import Pagination from '../../common/pagination';
import { Grid } from 'react-loader-spinner';
import ChatBotIcon from './chatBotIcon';

export default function ProductList() {
  const dispatch = useDispatch();
  const products=useSelector(selectAllProducts);
  const categories=useSelector(selectCategories);
  const manufacturers=useSelector(selectManufecturers);
  const totalItems=useSelector(selectTotalItems);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter,setFilter]=useState({});
  const [page,setPage]=useState(1);
  const status=useSelector(selectProductListStatus);
console.log("The products is",products);
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
    const pagination={_page:page,_limit:ITEMS_PER_PAGE}
 dispatch(fetchProductsByFiltersAsync({filter,pagination}))

  },[dispatch,filter,page])

  useEffect(()=>{
    setPage(1);
  },[totalItems]);

  useEffect(()=>{
    dispatch(fetchCategoriesAsync())
    dispatch(fetchManufecturersAsync())
   },[])
  

  return (
    <div>
    
      
      <div className='-mt-16'>
      <CarouselList></CarouselList>
      </div>
      <div className='fixed bottom-5 right-5'>
         <a  href='https://wa.me/923224120611'target='_blank'>
          <img src='/WhatsAppIcon.png'className='w-12' alt=''/>
         </a>
      </div>
      <div>

        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters}
        handleFilter={handleFilter}>

        </MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-[-100px]">
          <div className="flex items-baseline justify-between border-b border-purple-300 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-purple-900">All Products</h1>
              
              

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  
                </div>

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
                className="-m-2 ml-4 p-2 text-purple-600 hover:text-purple-500 sm:ml-6 lg:hidden"
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
                  <ProductGrid products={products} status={status}></ProductGrid>
                </div>
               
  
            </div>
          </section>
          
          <div className="lg:col-span-1 mt-8 lg:mt-0 lg:ml-auto mb-4 ">
              <ChatBotIcon />
            </div>

      <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems}></Pagination>
        </main>
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

          
          <form className="mt-4 border-t border-purple-400">
            {filters.map((section) => (
              <Disclosure as="div" key={section.id} className="border-t border-purple-400 px-4 py-6">
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
                              onChange={e=>handleFilter(e,section,option)}
  
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
      <Disclosure as="div" key={section.id} className="border-b border-purple-400 py-6">
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

function ProductGrid({products,status}){
  return(
   <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
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
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
      
          {products.map((product) => (
           <Link to={`/product-detail/${product.id}`} key={product.id}>
           <div className="group relative p-2 border-solid border-2 border-purple-800 rounded-md transform hover:scale-110 transition-transform duration-300 ease-in-out">
              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-purple-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="border-t border-purple-400 px-2 py-2 sm:px-2">
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-purple-800">
                    <div href={product.thumbnail}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </div>
                  </h3>
                  <p className="mt-1 text-sm text-purple-700">{product.form}</p>
                  <p className="mt-1 text-sm text-purple-700">PackSize:{product.packSize}</p>
                </div>
                <div>
                <p className="text-sm font-medium text-purple-900">Rs{discountPrice(product)} </p>
                <p className="text-sm font-medium line-through text-red-400">Rs {product.price}</p>
                </div>
                </div>
              </div>
              
                {product.deleted &&
                <div>
                 <p className='text-sm text-red-400'>Product is deleted</p> 
              </div>}
                {product.stock<=0 &&
                <div>
                 <p className='text-sm text-red-400'>out of Stock</p> 
              </div>}
              
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) 
}