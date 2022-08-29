import React, { useEffect } from 'react'
 import {Typography,AppBar, CssBaseline, Container} from "@material-ui/core"
import NavBar from '../../Components/NavBar/NavBar'
import axios from "axios";
import HomeHeading from '../../Components/HomeHeading/HomeHeading';
 
function Home() {
  useEffect(() => {
    getdata()

    return () => {
     
    };
  }, []);
 
 async function getdata(){
  // const data = await axios.get('/home')
  
}


  return (
     <>
     <CssBaseline/>
     <NavBar/>
   <HomeHeading/>

     
     </>
  )
}

export default Home