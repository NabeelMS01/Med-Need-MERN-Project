import React, { useEffect } from 'react'
 import {Typography,AppBar, CssBaseline, Container} from "@material-ui/core"
import NavBar from '../../Components/NavBar/NavBar'
import axios from "axios";
 
function Home() {
  useEffect(() => {
    getdata()

    return () => {
     
    };
  }, []);
 
 async function getdata(){
  const data = await axios.get('/home')
  console.log(data);
}


  return (
     <>
     <CssBaseline/>
     <NavBar/>
 <Container>
  
 



 </Container>

     
     </>
  )
}

export default Home