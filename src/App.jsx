import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'

import Appheader from './Pages/appheader';
import { ToastContainer } from 'react-toastify';
import './App.scss'
import './index.scss'
import { fetchProductList } from './store/features/lorem/loremSlice';
import UserList from './Pages/UserList';
import {lazy,Suspense} from 'react'
import Spinner from './Pages/spinner';

const LoginPage = lazy(()=>import('./Pages/Login'))
const Signup = lazy(()=>import('./Pages/signup'))
const ShowProductList = lazy(()=>import('./Pages/ShowProductList'))
const  AddProductList = lazy(()=>import('./Pages/addProductList'))

function App() {
 const studentData = useSelector((state)=>state.productData)
 const dispatch  = useDispatch()
 useEffect(()=>{
dispatch(fetchProductList())
 },[])
 

  return (
    <>
{/* <Spinner/> */}

<ToastContainer theme='colored' position='top-center'></ToastContainer>

<BrowserRouter>
<Appheader></Appheader>

			<Routes>

      <Route path="/" element={<Suspense fallback={<Spinner/>}><LoginPage/></Suspense>} />

			<Route path="signup" element={<Suspense fallback={<Spinner/>}>
<Signup/>      </Suspense>
} />

      <Route path="/ShowProductList" element={ <Suspense fallback={<Spinner/>}> <ShowProductList/>   </Suspense> } />
      <Route path='user-list' element={<Suspense fallback={<Spinner/>}><UserList/> </Suspense>    
}/>

			<Route path="/addproductlist" element={<Suspense fallback={<Spinner/>}><AddProductList/></Suspense>     
} />
	</Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;

