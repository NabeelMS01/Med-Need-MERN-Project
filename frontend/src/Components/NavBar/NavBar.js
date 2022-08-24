import { AppBar, Button, IconButton, InputBase, Tab, Tabs, TextField, Toolbar, Typography, useMediaQuery } from '@material-ui/core'
import {AddCircleOutlineOutlined, Search} from '@mui/icons-material'
 import {makeStyles} from '@material-ui/core'
import React from 'react'
import { fontSize } from '@mui/system'
import DrawerComp from './DrawerComp'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const useStyle = makeStyles((theme)=>({
  navBar:{
   backgroundColor:"#fafafa",
   boxShadow:"none",
   fontWeight:"bold",
   color:"#257069"
  },
    createBtn:{
        color:"#257069"
    },
    textBtn:{
      color:"#257069"

    }
}))

function NavBar() {
  const navigate =useNavigate()
  const theme =useTheme()
const isMatch = useMediaQuery(theme.breakpoints.down("md"))

  const classes=useStyle()

  return (
    <React.Fragment>
 <AppBar  className={classes.navBar}  position='relative'>
     <Toolbar>

 <Typography style={{ fontWeight:"bolder"}} variant='h5'>
    Med <AddCircleOutlineOutlined/> Need
 </Typography>

  <div style={{marginLeft:"auto"}} >
{     !isMatch?( <>  
<InputBase    
        sx={{ ml: 1, flex: 1,  }}
        placeholder="Search.."
        inputProps={{ 'aria-label': 'search.......' }}
         > 
         
         
          </InputBase> 
        <IconButton  type="button" sx={{ p: '10px' }} aria-label="search.....">
          <Search/>
        </IconButton>
     
      
  <Button style={{marginLeft:"25px",fontWeight:"bold" }}  variant='text'  >Browse Professionals</Button>
  <Button style={{marginLeft:"25px",fontWeight:"bold" }}  variant='text' onClick={()=>{navigate('/login')}}  >Login</Button>
  <Button style={{marginLeft:"25px",fontWeight:"bold" , borderColor:"#257069",border:"solid 1.5px", color:"#257069" }}  variant='outlined' onClick={()=>{navigate('/create-account')}}   >Create Account</Button>
  </> ):  <DrawerComp/>
}

  </div>
 


  

     </Toolbar>
   
    <div>

    </div>
 </AppBar>


    </React.Fragment>
  )
}

export default NavBar