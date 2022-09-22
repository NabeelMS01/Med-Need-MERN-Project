import { Button } from "@material-ui/core";
import {
  Female,
  Height,
  LocationOn,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Card, Grid, Rating, Typography } from "@mui/material";
import React, { useState } from "react";

function ProfessionalCard({ data }) {
  const [showMore, setShowMore] = useState(false);
  console.log(data);

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
            <Box sx={{ marginLeft: "10px" }}>
              {/* Profile picture */}
              {data.profile_img ? (
                <Avatar
                  src={data.profile_img.url}
                  sx={{ margin: "auto", width: "110px", height: "110px" }}
                />
              ) : (
                <Avatar
                  sx={{ margin: "auto", width: "110px", height: "110px" }}
                ></Avatar>
              )}
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
                    {data.name}
                  </Typography>
                </Grid>

                <Grid xs={10} md={3.5} item>
                  {/* Designation of the professional  */}
                  <Typography sx={{ color: "#818181" }} variant="subtitle1">
                    {data.profession}
                  </Typography>
                </Grid>
                <Grid xs={10} md={10} item>
                  <Box>
                    {/* Rating of the professional */}
                    <Rating
                      name="half-rating-read"
                      defaultValue={data.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </Grid>

                <Grid xs={10} md={10} item>
                  <Box sx={{ display: "flex", color: "#616161" }}>
                    {/* Location  */}
                    <LocationOnOutlined />{" "}
                    <Typography>{data.location && data.location}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid sx={{ margin: "auto" }} xs={12} md={10} item>
            <Box>
              {/* Bio of the professional */}
              <Typography
                variant="body2"
                sx={{
                  color: "#616161",
                  height: showMore ? "auto" : "60px",
                  overflow: showMore ? "visible" : "hidden",
                  transitionDuration: "200ms",
                }}
              >
                {data.about}
              </Typography>

              <a
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setShowMore(!showMore)}
              >
                {" "}
                {!showMore ? "more" : "show less"}
              </a>
            </Box>
            <Box sx={{ marginTop: "15px", display: "flex" }}>
              {/* Gender */}
              <Female /> <Typography variant="subtitle1">{data.gender}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>{/* Location  */}</Box>
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
