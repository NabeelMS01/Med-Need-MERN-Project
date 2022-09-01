 
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
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Dashboard/Profile';
 
import ProfileEdit from './Pages/Dashboard/ProfileEdit';
function App() {
  const [open, setOpen] = useState(false);
   const [openAlert, setOpenAlert] =  useState(false);
   const [addCatState,setaddCatState ] =useState(false)
   const [formAlert,setformAlert]=useState(true)
  return (

<DrawerContext.Provider value={{open,setOpen}}>
 <AlertContext.Provider value={{openAlert, setOpenAlert,addCatState,setaddCatState,formAlert,setformAlert }} >
<ThemeProvider theme={theme} >

  <BrowserRouter> 
 
<Routes>
  //===================user side==============
   <Route path='/' element={<Home/>} />
   <Route path='/create-account' element={<SignUp/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/dashboard' element={ <Dashboard/>} />
  <Route path='/profile' element={ <Profile/>} />
  <Route path='/update-profile' element={ <ProfileEdit/>} />

  
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
