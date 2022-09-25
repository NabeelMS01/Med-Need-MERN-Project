import { Done, DoneOutline, LocationOnOutlined } from "@mui/icons-material";
import { Avatar, Button, Grid, Rating, Typography } from "@mui/material";
import { Box, Container, height } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import About from "../../Components/ProfessionalDetailPage/About";
import Language from "../../Components/ProfessionalDetailPage/Language";
import { AlertContext, ComponentContext } from "../../contexts/contexts";
import VerifiedIcon from "@mui/icons-material/Verified";
import Testimonial from "../../Components/ProfessionalDetailPage/Testimonial";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import HireModal from "../../Components/ProfessionalDetailPage/HireModal";
function ProfessionalDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [languages, setLanguages] = useState([]);
 const {openModal, setOpenModal}  = useContext(AlertContext)
  
  useEffect(() => {
    getDetails();

    return () => {};
  }, []);

  const getDetails = async () => {
    try {
      await axios.get(`/view-professional/${id}`).then(({ data }) => {
        setLanguages(data.languages[0].split(","));
        setData(data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(languages);



const handleOpen=()=>{
  setOpenModal(true)
}


  return (
    <>




      <div style={{ backgroundColor: "#F4F4F4", paddingBottom: "1px" }}>
        <NavBar />

        <Grid md={9} sm={9} xs={12} m={"auto"} container my={7}>
          <Grid xs={12} md={3} sm={3} item>
            <Avatar
              src={data.profile_img?.url}
              sx={{ width: "120px", height: "120px", margin: "auto" }}
            />
          </Grid>
          <Grid xs={11} md={8} sm={5} m="auto" item>
            {/* Name of the professional  */}

            <Grid container rowSpacing={1}>
              <Grid xs={7} md={9} item>
                <Typography sx={{ color: "#257069" }} variant="h6">
                  {data?.name && data?.name}{" "}
                  {data?.approval_status && (
                    <VerifiedIcon sx={{ color: "green" }} />
                  )}
                </Typography>

                <Typography variant="subtitle1" style={{ color: "grey" }}>
                  member since : {moment(data?.createdAt).format("LL")}
                </Typography>
              </Grid>

              <Grid xs={5} md={3} item>
                {/* Designation of the professional  */}
                <Typography sx={{ color: "#818181 " }} variant="subtitle1">
                  {data?.profession}
                </Typography>
              </Grid>
              <Grid xs={12} md={9} item>
                <Rating
                  name="half-rating-read"
                  defaultValue={!data?.rating && 4.5}
                  precision={0.5}
                  size={"medium"}
                  readOnly
                />
              </Grid>

              <Grid xs={8} md={9} item>
                <Box sx={{ display: "flex", color: "#616161" }}>
                  {/* Location  */}
                  <LocationOnOutlined />{" "}
                  <Typography>{data?.location}</Typography>
                </Box>
              </Grid>

              <Grid xs={5} md={3} item>
                {/* Designation of the professional  */}
                <Button
              onClick={handleOpen} 
                  style={{
                    background: " #3A847D ",
                    color: "white",
                    border: "none",
                  }}
                  sx={{ width: "120px" }}
                  variant={"outlined"}
                >
                  Hire
                </Button>

                <HireModal handleOpen={handleOpen} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Grid md={9} sm={9} xs={11} m={"auto"} container spacing={2} my={1}>
        <Grid item md={8}>
          <Grid>
            <Typography variant="subtitle1">About me</Typography>
          </Grid>
          <About>{data.about}</About>
          <Grid>
            <a href={data?.resume?.url} target={"_blank"}>
              <Button
                style={{
                  background: " #3A847D ",
                  color: "white",
                  border: "none",
                  marginTop: "20px",
                }}
                variant={"outlined"}
              >
                View resume
              </Button>
            </a>
          </Grid>
        </Grid>

        <Grid md={4} item>
          <Grid gap={1} container>
            <Grid>
              <Box>
                <Typography variant="subtitle1">$ 600</Typography>
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  variant="subtitle2"
                >
                  {" "}
                  Hourly
                  <br /> Rate
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Box
                sx={{
                  borderLeft: "1px solid grey",
                  paddingLeft: "10px",
                  height: "80px",
                }}
              >
                <Typography variant="subtitle1">40 </Typography>
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  variant="subtitle2"
                >
                  {" "}
                  works
                  <br /> completed
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Box
                sx={{
                  borderLeft: "1px solid grey",
                  paddingLeft: "10px",
                  height: "80px",
                }}
              >
                <Typography variant="subtitle1">10 </Typography>
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  variant="subtitle2"
                >
                  {" "}
                  Rehired
                  <br />{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid md={12} m={"auto"} gap={1} container>
            <Grid xs={12} md={12} item>
              <Typography>Languages</Typography>
            </Grid>

            {languages?.map((data) => (
              <Language title={data} /> 
            ))}

            <Grid></Grid>
            <Grid></Grid>
          </Grid>
        </Grid>

        <Grid item></Grid>
      </Grid>

      <Grid md={9} sm={9} xs={11} m={"auto"} container>
        <Grid md={8} xs={12} sm={8} item>
          <Box
            sx={{
              backgroundColor: "rgba(48, 171, 74, 0.3)",
              width: "100%",
              height: "30px",
              padding: "5px",
              textTransform: "capitalize",
            }}
          >
            <Typography color={"#30AB4A"}> Testimonials</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid rowGap={1} md={9} sm={9} xs={11} m={"auto"} my={2} container>
        <Testimonial
          username={"mary"}
          review={
            "om development problems to adults and the elderly affected by and recovering from injuries and movement disorders. I have excellent communication skills, both wr"
          }
          rating={4.5}
        />
      </Grid>
    </>
  );
}

export default ProfessionalDetails;
