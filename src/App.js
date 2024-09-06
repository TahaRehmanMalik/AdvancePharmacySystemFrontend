import CarouselList from './features/product-list/carousel';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import * as React from "react";
import { useEffect } from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/orderSuccessPage';
import UserOrdersPage from './pages/userOrdersPage';
import UserProfilePage from './pages/userProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/component/Logout';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ProtectedAdmin from './features/auth/component/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductForm';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import StripeCheckout from './pages/StripeCheckout';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import PolicyPage from './pages/PolicyPage';
import FAQPage from './pages/FAQPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FileUploadImage from './pages/FileUpload';
const options = {
  timeout: 3000,
  position: positions.TOP_CENTER
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/admin/",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
  },  
  {
    path: "/admin/product-form/",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element:<Protected><Checkout></Checkout></Protected> ,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccessPage></OrderSuccessPage></Protected>,
  },
  {
    path: "/my-orders",
    element: <Protected><UserOrdersPage></UserOrdersPage></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/upload",
    element: <FileUploadImage></FileUploadImage>,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage></ForgetPasswordPage>,
  },
  {
    path: "/stripe-checkout/",
    element:<Protected><StripeCheckout></StripeCheckout></Protected> ,
  },
  {
    path: "/about",
    element: <AboutPage></AboutPage>,
  },
  {
    path: "/blog",
    element: <BlogPage></BlogPage>,
  },
  {
    path: "/policy",
    element: <PolicyPage></PolicyPage>,
  },
  {
    path: "/faq",
    element: <FAQPage></FAQPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);
function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser)
  const userChecked=useSelector(selectUserChecked);
useEffect(()=>{
dispatch(checkAuthAsync());
},[])

  useEffect(()=>{
if(user){
      dispatch(fetchItemsByUserIdAsync())  
      // we can get req.user by token on backend no need to give in front
      dispatch(fetchLoggedInUserAsync())
    }
},[dispatch,user])
  return (
    <>
    <div className="App">
      {userChecked&&
      <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>}
    </div>
    </>
  );
}

export default App;
