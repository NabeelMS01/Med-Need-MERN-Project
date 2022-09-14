import { Container, makeStyles, styled } from "@material-ui/core";
import { FilterList, Sort } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Drawer } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MdSort from "../SortComponent/MdSort";
import MdFilterComponent from "./MdFilterComponent";

   
const useStyles = makeStyles({
    root: {

        position: 'fixed',
      top: "0rem",
   
      zIndex:"5",
      backgroundColor:"white"
    },})


function MobileFilterComponent() {
    const [stickey,setStickey]=useState(false)
    const controls =useRef()
 const[OpenSortTab,setOpenSortTab]= useState(false)
 const[OpenFilterTab,setOpenFilterTab]= useState(false)
    useEffect(() => {


 handleScroll()
     window.addEventListener("scroll",handleScroll)

        return () => {
               window.removeEventListener("scroll",handleScroll)
        };
    }, [stickey ]);

    const handleScroll =()=>{
      const initialTop =controls.current.getBoundingClientRect().top  ;
console.log({initialTop});

        console.log(window.scrollY);
        setStickey(window.scrollY > 135? true:false  );
     }  

    const classes = useStyles();
   

  

  return (<>
    {
      stickey&&<>
      <div style={{height:"58px"}} ></div>
      </>
     } 
       <Container   className={ stickey && classes.root}  ref={controls} >   
          
    
    <ButtonGroup sx={{width:"100%", left:'1rem',marginTop:"20px" }}  variant="outlined" aria-label="outlined primary button group">
      <Button onClick={()=>setOpenSortTab(true)} startIcon={<Sort/> }  sx={{width:"100%"}} color={"success"} >Sort</Button>
      <Button onClick={()=>setOpenFilterTab(true)} startIcon={<FilterList/>}  sx={{width:"100%"}} color={"success"} >Filter</Button>
    
    </ButtonGroup>
   


      </Container>
      <Drawer
      anchor={"bottom"}
      open={ OpenSortTab}
      onClose={ ()=>setOpenSortTab(false)}
         
       >
 
    <Box sx={{paddingTop:"30px"}} >
    <MdSort/>
    </Box>
 
    </Drawer>
    <Drawer
      anchor={"bottom"}
      open={ OpenFilterTab}
      onClose={ ()=>setOpenFilterTab(false)}
         
       >
 
    <Box sx={{paddingTop:"30px"}} >
    <MdFilterComponent/>
    </Box>
 
    </Drawer>





      
      </>
  );
}

 

export default MobileFilterComponent;
