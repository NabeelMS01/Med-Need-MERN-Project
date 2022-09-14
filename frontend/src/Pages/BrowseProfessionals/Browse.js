import { Container, useMediaQuery, useTheme } from "@material-ui/core";
import { Box, Grid, MenuItem } from "@mui/material";
import React from "react";
import BrowsePage from "../../Components/BrowsePage/BrowseNav";
import MdFilterComponent from "../../Components/FilterComponent/MdFilterComponent";
import MobileFilterComponent from "../../Components/FilterComponent/MobileFilterComponent";
import ProfessionalCard from "../../Components/ProfessionalCard/ProfessionalCard";
import MdSort from "../../Components/SortComponent/MdSort";

import "./Browse.css";
function Browse() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
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
              
              <ProfessionalCard data={{name:"sara mathew"}}   />
             
            </Container>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Browse;
