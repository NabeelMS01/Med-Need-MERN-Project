import { Typography } from "@material-ui/core";
import { Email, Home, Key, Password, Person, Phone } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [userCheck, setuserCheck] = useState("professional");

  const navigate = useNavigate();
  // ================================================================
  const [isProfessional, setisProfessional] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [progressBar, setprogressBar] = useState(false);
  const [errormessage, seterrormessage] = useState(false);
  // =================================================================
  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPhone, seterrorPhone] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  // ================================================================

  const handleEmail = () => {
    seterrormessage(false);
    if (email.length <= 0) {
      seterrorEmail("Email cannot be empty");
      return false;
    } else if (!email.match(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/)) {
      seterrorEmail("Enter a proper email address");
      return false;
    } else {
      seterrorEmail(null);
      return true;
    }
  };

  const handlePassword = () => {
    seterrormessage(false);
    if (password.length <= 0) {
      seterrorPassword("Password cannot be empty");
      return false;
    } else {
      seterrorPassword(null);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    seterrormessage(false);
    e.preventDefault();
    if (!handleEmail() && !handlePassword()) {
    } else if (!handleEmail() || !handlePassword()) {
    } else {
      try {
        setprogressBar(true);

        const config = {
          header: {
            "content-type": "application/json",
          },
        };
        await axios
          .post(
            "/admin-login",
            {
              email,
              password,
            },
            config
          )
          .then(async({data}) => {
            
console.log(data);
const userData=JSON.stringify(data)
   
 localStorage.setItem("adminInfo",userData);
  navigate('/admin-dashboard')
 







          })
          .catch((err) => {
            setprogressBar(false);
            if (err.response.data == "wrong password") {
              setprogressBar(false);
              seterrormessage("wrong password");
            } else if (err.response.data == "wrong email") {
              setprogressBar(false);
              seterrormessage("No account exist");
            } else if (err.response.data == "account blocked") {
              setprogressBar(false);
              seterrormessage("your account is blocked");
            }
          });
      } catch (err) {
 
        seterrormessage("error occured");

      }
    }
  };
  useEffect(() => {
    const userInfo =localStorage.getItem("adminInfo");
    if(userInfo){
      navigate('/admin-dashboard')
    }
    return () => {
      
    };
  }, [ ]);


  return (
    <div>
     

      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={"95%"}
        alignItems="start"
        justifyContent={"center"}
        margin={"auto"}
        marginTop={"20px"}
      >
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="outlined"
          sx={{
            ":hover": {
              backgroundColor: "#363636",
              color: "white",
              border: "none",
            },
            backgroundColor: "#000000",
            color: "white",
            border: "none",
            alignItems: "center",
            marginLeft: "15px",
          }}
        >
          {" "}
          <Home sx={{ marginRight: "10px" }} /> Go home
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin={"auto"}
          marginTop={" "}
          padding={"5px "}
        >
          {errormessage ? (
            <Alert sx={{ width: "83%" }} variant="outlined" severity="error">
              {errormessage}
            </Alert>
          ) : null}
 <Typography
            style={{ margin: "auto", padding: "20px",fontWeight:'bold' }}
            variant="h5"
          >
             Admin Login 
          </Typography>
           
          

          <Box
            display="flex"
            flexDirection={"row"}
            alignItems="center"
            justifyContent={"center"}
            margin={"auto"}
            marginTop={"0px"}
            padding={"5px "}
          ></Box>

          <span
            style={{ color: "red", marginRight: "auto", paddingLeft: "20px" }}
          >
            {errorEmail}
          </span>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
            placeholder="Email"
            type={"email"}
            sx={{ width: "360px" }}
            onChange={(e) => setemail(e.target.value)}
            onKeyUp={() => {
              handleEmail();
            }}
          />

          <span
            style={{ color: "red", marginRight: "auto", paddingLeft: "20px" }}
          >
            {errorPassword}
          </span>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <Key style={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
            placeholder="Password"
            type={"password"}
            sx={{ width: "360px" }}
            onChange={(e) => setpassword(e.target.value)}
            onKeyUp={() => {
              handlePassword();
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              width: "360px",
              backgroundColor: "#238279",
              ":hover": { backgroundColor: "#2A9F94 " },
            }}
          >
      {       progressBar ? (
        <CircularProgress style={{width:"23px", height:"23px",color:"white"}}   />
      ) : "Login"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AdminLogin;
