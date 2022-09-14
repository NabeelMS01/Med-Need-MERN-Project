import { Button } from "@material-ui/core";
import { Female, Height, LocationOn, LocationOnOutlined } from "@mui/icons-material";
import { Avatar, Box, Card, Grid, Rating, Typography } from "@mui/material";
import React from "react";

function ProfessionalCard({data}) {


  const { name }=data
  console.log(name);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "#767676",
          padding: "10px", 
          marginTop: "15px",
        }}
      >
        <Grid spacing={2} container my={2}>
          <Grid xs={4} md={2} item>
            <Box  sx={{marginLeft:"10px"}}  >
              {/* Profile picture */}
              <Avatar
                sx={{ margin: "auto", width:"110px" ,height:"110px" }}
              />
            </Box>
          </Grid>
          <Grid xs={8} md={10} item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* Name of the professional  */}

              <Grid container mx={2}>
                <Grid xs={10} md={8.5} item>
                  <Typography sx={{ color: "#257069" }} variant="h6">
                  {name}
                  </Typography>
                </Grid>

                <Grid xs={10} md={3.5} item>
                  {/* Designation of the professional  */}
                  <Typography sx={{ color: "#818181" }} variant="subtitle1">
                    Physiotherapist
                  </Typography>
                </Grid>
                <Grid xs={10} md={10} item>
                  <Box>
                    {/* Rating of the professional */}
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                  </Box>
                </Grid>

  <Grid xs={10} md={10} item>
             <Box sx={{ display: "flex",color:"#616161" }}>
                {/* Location  */}
                <LocationOnOutlined /> <Typography>Kochi, India</Typography>
              </Box>
                </Grid>
                
              </Grid>
            </Box>
          </Grid>
          <Grid sx={{ margin: "auto" }} xs={12} md={10} item>
            <Box >
              {/* Bio of the professional */}
              <Typography variant="body2" sx={{color:"#616161"}}  >
                Hi iam a physiotherapist with 3 years experiance in pt
                management, rehabilitation
              </Typography>
            </Box>
            <Box sx={{ marginTop: "15px",display:"flex" }}>
              {/* Gender */}
           <Female/>   <Typography variant="subtitle1">Female</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                {/* Location  */}
             
              </Box>
              <Box sx={{ display: "flex" }}>
                {/* Location  */}
                <Button
                  style={{ backgroundColor: "#257069", color: "white" }}
                  variant="outlined"
                >
                  View Details
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ProfessionalCard;
