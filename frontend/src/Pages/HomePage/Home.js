import React, { useContext, useEffect } from "react";
import { Typography, AppBar, CssBaseline, Container } from "@material-ui/core";
import NavBar from "../../Components/NavBar/NavBar";
import axios from "axios";
import HomeHeading from "../../Components/HomeHeading/HomeHeading";
import Categories from "../../Components/CategoriesComponent/Categories";
import Footer from "../../Components/Footer/Footer";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/contexts";

function Home() {
  const navigate = useNavigate();

 
 

 
  return (
    <>
      <CssBaseline />
      <NavBar />
      <HomeHeading />

      <Categories />

      <Footer />
    </>
  );
}

export default Home;
