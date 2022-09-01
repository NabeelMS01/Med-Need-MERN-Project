import React, { useContext, useEffect } from 'react'
 import {Typography,AppBar, CssBaseline, Container} from "@material-ui/core"
import NavBar from '../../Components/NavBar/NavBar'
import axios from "axios";
import HomeHeading from '../../Components/HomeHeading/HomeHeading';
import Categories from '../../Components/CategoriesComponent/Categories';
import Footer from '../../Components/Footer/Footer';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../contexts/contexts';
 
function Home() {

  const navigate =useNavigate();

  const {formAlert,setformAlert}=useContext(AlertContext)
  useEffect(() => {

     console.log(formAlert); 
    setTimeout(()=>{getdata()},3000 )
  
   
  }, [formAlert]);
 
 async function getdata(){
  // const data = await axios.get('/home')

const userId= localStorage.getItem('userInfo')
const user= await JSON.parse(userId)

const config = {
  headers: {
    "Content-type": "application/json",
  },
};
if(user.isProfessional ){

await axios.post("/formStatus",user,config ).then(({data})=>{
 
if(!data.status&&formAlert){
  swal("Please update your profile  in order to list your profile \n \n\n\n ", {
    buttons: {
      cancel: "May be later",
      sure: true,
    },
  })
  .then((value) => {
    switch (value) {
   
      case "sure":
        navigate("/update-profile")
        break;
    case "cancel":
  setformAlert(false)
   console.log(formAlert);
    break
       default:break
   
       
    }
  });



}


})


}




  
}


  return (
     <>
     <CssBaseline/>
     <NavBar/>
   <HomeHeading/>
 
   <Categories/>
   
  <Footer/>
     
     </>
  )
}

export default Home