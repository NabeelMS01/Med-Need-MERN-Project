import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
  } from "@mui/material";
  import React from "react";

function MdSort() {
  return (
    <>
    
  
      <Grid md={8}  >
        <Container>
          <Box>
            <Typography variant="h5">Sort</Typography>
          </Box>

          <Box style={{ marginTop: "10px", height: "200px" }}>
           
            <FormControl>
              <RadioGroup
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  height:"200px"
                   
                }}
                
              >
                <FormControlLabel
                  value={"price_ascending"}
                  control={<Radio />}
                  label={"Price - Low to high"}
                />
                <FormControlLabel
                  value={"price_descending"}
                  control={<Radio />}
                  label={"Price - High to low"}
                />
                 <FormControlLabel
                  value={"popularity"}
                  control={<Radio />}
                  label={"Popularity"}
                />
                
              </RadioGroup>
            </FormControl>
          </Box>

           


        </Container>
      </Grid>
    </>
    
     
  )
}

export default MdSort