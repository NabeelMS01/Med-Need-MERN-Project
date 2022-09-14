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
import LangFilter from "../LanguageFilter/LangFilter";

function MdFilterComponent() {
  return (
    <>
      <Grid md={8} >
        <Container>
          <Box>
            <Typography variant="h5">Filter</Typography>
          </Box>

          <Box style={{ marginTop: "10px", height: "200px" }}>
            <Box>
              <Typography variant="h6">Gender</Typography>
            </Box>
            <FormControl>
              <RadioGroup
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "150px",
                }}
                defaultValue={"all"}
              >
                <FormControlLabel
                  value={"all"}
                  control={<Radio />}
                  label={"All"}
                />
                <FormControlLabel
                  value={"female"}
                  control={<Radio />}
                  label={"Female"}
                />
                <FormControlLabel
                  value={"male"}
                  control={<Radio />}
                  label={"Male"}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box style={{ marginTop: "10px", height: "200px" }}>
            <Box>
              <Typography variant="h6">Language</Typography>
              
            </Box>
             <Box>
              <LangFilter/>
              
            </Box>


          </Box>


        </Container>
      </Grid>
    </>
  );
}

export default MdFilterComponent;
