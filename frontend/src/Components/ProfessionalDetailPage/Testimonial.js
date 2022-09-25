import { Avatar, Box, Button, Grid, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'

function Testimonial({review,src,rating,username}) {

    const [more,setMore] =useState(false)


  return (
   <>
   <Grid md={8} xs={12} sm={8} item>
          <Box
            sx={{
              backgroundColor: "rgba(48, 171, 74, 0.3)",
              width: "100%",
              borderRadius: "5px",
              padding: "5px",
              textTransform: "capitalize",
            }}
          >
            <Grid md={11} xs={12} sm={12} m={"auto"} marginTop={1} container>
              <Grid margin={"auto"} xs={2}>
                <Avatar style={{minWidth:"50px",minHeight:"50px", }}  src= {src}/>
              </Grid>
              <Grid xs={10}>
                <Typography variant="subtitle1">{username}</Typography>
                <Rating readOnly value={rating} size={"small"} />
              </Grid>
              <Grid xs={2}></Grid>
              <Grid xs={10}>
               <Box sx={{ height:!more?"40px":"auto",overflow:"clip" }} >
               <Typography  variant="body2" color={"#525252"}>
                 {review}
                </Typography>
                
               </Box>
                <Typography style={{cursor:"pointer"}}  onClick={()=>setMore(!more)} variant='button' color={"primary"} >{!more?"more":"Less"}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid></>
  )
}

export default Testimonial