import { Container, useMediaQuery, useTheme } from "@material-ui/core";
import { Box, Grid, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect} from "react";
import  {useNavigate} from "react-router-dom";


import BrowsePage from "../../Components/BrowsePage/BrowseNav";
import MdFilterComponent from "../../Components/FilterComponent/MdFilterComponent";
import MobileFilterComponent from "../../Components/FilterComponent/MobileFilterComponent";
import ProfessionalCard from "../../Components/ProfessionalCard/ProfessionalCard";
import MdSort from "../../Components/SortComponent/MdSort";
import { ComponentContext } from "../../contexts/contexts";

import "./Browse.css";
function Browse() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
 const {loading, setLoading}=useContext(ComponentContext)
 const {ProData, setProData} = useContext(ComponentContext);
 const {professionalData, setprofessionalData}=useContext(ComponentContext)
 const navigate =useNavigate()
const handleViewDetails=(id)=>{
  console.log(id);
  setprofessionalData({id:id})
  navigate(`/view-professional/${id}`)

}


const getProfessionalData = async()=>{

  try {
    setLoading(true)
    await axios.get("/list-professionals").then((response)=>{
     
      setProData(response.data)
    })


     setLoading(false)
  } catch (error) {
    setLoading(false)
  } 
}
 
  useEffect(() => {
     getProfessionalData()
    return () => {
       
    };
  }, [ ]);


  return (
    <div>
      <BrowsePage />
      <main>
        <Grid md={10} m={"auto"} container my={2}>
          {isMatch ? (
            <Grid xs={12} md={12} item>
              <MobileFilterComponent />
            </Grid>
          ) : null}
          {!isMatch && (
            <Grid xs={12} md={3} item>
              <MdFilterComponent />
              <MdSort/>
            </Grid>
          )}


          <Grid xs={12} md={8} item>
          <Grid xs={12} md={12} item>
             
             
            </Grid>
            <Container>
           {   ProData.map((data,index)=>(
   <>
    <ProfessionalCard key={index} data={data } index={index} handleViewDetails={handleViewDetails}  />
 </>  
           ))
             
              
              }
             
            </Container>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Browse;
