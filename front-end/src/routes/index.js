import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdmPanel from "../pages/AdmPanel";

import AllProducts from "../pages/AllProducts";
import Allusers from "../pages/Allusers";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children :[
      {
        path:'',
        element:<Home/>

      },{
        path:"login",
        element:<Login/>
      },{
        path:'/forgot-password',
        element:<ForgotPassword/>
      },{
        path:'/sign-up',
        element:<SignUp/>
      },
      {
        path : "/product-category",
        element : <CategoryProduct/> 
      },
      {
        path : "product/:id",
        element : <ProductDetail/>
      },{
        path:'cart',
        element:<Cart/>
      },{
         path:'search',
         element:<SearchProduct/>
      },
      {
        path:"admin-panel",
        element: <AdmPanel/>,
        children : [
          {
            path : 'all-users',
            element : <Allusers/>
          },
          {
            path : "all-products",
            element : <AllProducts/>
          }
        ]
      }
    ]
  }
])

export default router