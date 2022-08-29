 
import './App.css';
import React, { useState } from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from './Pages/HomePage/Home';
 
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import AdminDashboard from './Pages/AdminSide/AdminDashboard';
 import {theme} from './theme'
import { ThemeProvider } from '@material-ui/core';
import AdminUsers from './Pages/AdminSide/Professionals';
import { AlertContext, DrawerContext } from './contexts/contexts';
import Clients from './Pages/AdminSide/Clients';
import AdminLogin from './Pages/AdminSide/Login/AdminLogin';
import ManageCategory from './Pages/AdminSide/ManageCategory';
function App() {
  const [open, setOpen] = useState(false);
   const [openAlert, setOpenAlert] =  useState(false);
   const [addCatState,setaddCatState ] =useState(false)
  return (

<DrawerContext.Provider value={{open,setOpen}}>
 <AlertContext.Provider value={{openAlert, setOpenAlert,addCatState,setaddCatState }} >
<ThemeProvider theme={theme} >

  <BrowserRouter> 
 
<Routes>
  //===================user side==============
   <Route path='/' element={<Home/>} />
   <Route path='/create-account' element={<SignUp/>} />
  <Route path='/login' element={<Login/>} />
 
//===================admin side==========================


<Route path='/admin-manage-category' element={ <ManageCategory/>} />
  <Route path='/admin-dashboard' element={ <AdminDashboard/>} />
   <Route path='/admin-professionals' element={ <AdminUsers/>} />
   <Route path='/admin-clients' element={ < Clients/>} />
   <Route path='/admin' element={ <AdminLogin/> } />
</Routes>


 </BrowserRouter>
</ThemeProvider>
</AlertContext.Provider> 
</DrawerContext.Provider>
 
  );
}

export default App;
