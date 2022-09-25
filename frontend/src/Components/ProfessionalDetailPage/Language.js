import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

function Language({title}) {
  return (
   <>
     <Grid md={5} item >
              <Box sx={{backgroundColor:"rgba(48, 171, 74, 0.3)",borderRadius:"5px",textAlign:"center",textTransform:"capitalize" }} >
                <Typography color={"#30AB4A"} >{title}</Typography>
                </Box>  
              </Grid>
   
   </>
  )
}

export default Language