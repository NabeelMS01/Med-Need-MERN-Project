 
import './App.css';
import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from './Pages/HomePage/Home';
 
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import AdminDashboard from './Pages/AdminSide/AdminDashboard';
 import {theme} from './theme'
import { ThemeProvider } from '@material-ui/core';
import AdminUsers from './Pages/AdminSide/Professionals';
import { DrawerContext } from './contexts/contexts';
import Clients from './Pages/AdminSide/Clients';
function App() {
  const [open, setOpen] = React.useState(false);
  return (

<DrawerContext.Provider value={{open,setOpen}}>
  
<ThemeProvider theme={theme} >

  <BrowserRouter> 
 
<Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/create-account' element={<SignUp/>} />
  <Route path='/login' element={<Login/>} />
 
  <Route path='/admin-dashboard' element={ <AdminDashboard/>} />
   <Route path='/admin-professionals' element={ <AdminUsers/>} />
   <Route path='/admin-clients' element={ < Clients/>} />
</Routes>


 </BrowserRouter>
</ThemeProvider>

</DrawerContext.Provider>
 
  );
}

export default App;
