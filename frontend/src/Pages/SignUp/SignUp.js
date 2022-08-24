import { Typography } from "@material-ui/core";
import axios from "axios";
import { Email, Home, Key, Password, Person, Phone } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userCheck, setuserCheck] = useState("professional");

  const navigate = useNavigate();
  // ================================================================
  const [isProfessional, setisProfessional] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [progressBar, setprogressBar] = useState(false);
  // =================================================================
  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPhone, seterrorPhone] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  // ================================================================

  const handleName = () => {
    if (name.length <= 0) {
      seterrorName("Name cannot be empty");
    } else {
      seterrorName(null);
      return true;
    }
  };

  const handleEmail = () => {
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

  const handlePhone = () => {
    if (phone.length <= 0) {
      seterrorPhone("Phone number cannot be empty");
      return false;
    } else if (phone.length < 10||phone.length > 10) {
      seterrorPhone("Enter a proper phone number");
      return false;
    } else {
      seterrorPhone(null);
      return true;
    }
  };

  const handlePassword = () => {
    if (password.length <= 0) {
      seterrorPassword("Password cannot be empty");
      return false;
    } else if (password.length < 6) {
      seterrorPassword("Password must be  6 charecters long");
      return false;
    } else if (password.length <= 0) {
      seterrorPassword("password cannot be empty");
      return false;
    } else {
      seterrorPassword(null);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (
        !handleName() &&
        !handleEmail() &&
        !handlePhone() &&
        !handlePassword()
      ) {
      } else if (
        !handleName() ||
        !handleEmail() ||
        !handlePhone() ||
        !handlePassword()
      ) {
      } else {
        setprogressBar(true);
        console.log("created");

         await axios.post(
          "/create-account",
          {
            name,
            email,
            phone,
            password,
            is_professional:isProfessional? true:false,
            is_employer:isProfessional==false?true:false,
          },
          config
        ).then((res)=>{
          console.log(res);
        })
      
    
      setprogressBar(false);
     
     navigate('/login')
        

 
      }
    } catch (error) {
      
    
      if(error){
        
          if(error.response.data=="email exist"){
            seterrorEmail("user with this email already exist")
          }else if( error.response.data=="number exist"){
            seterrorPhone("user with this number already exist")
          }


          console.log(error.response.data);
        
        setprogressBar(false);}

    }
  };

  return (
    <div>
      {progressBar ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            marginLeft: "48%",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "#238279" }} />
        </Box>
      ) : null}
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
          padding={"5px "}
        >
          <Typography
            style={{ marginRight: "auto", padding: "20px" }}
            variant="h5"
          >
            Lets create your account !
          </Typography>
          <Typography style={{ marginRight: "auto", paddingLeft: "20px" }}>
            {" "}
            Already a member?{" "}
            <Button
              variant="text"
              onClick={() => {
                navigate("/login");
              }}
              style={{ color: "#238279" }}
            >
              {" "}
              Login
            </Button>{" "}
          </Typography>

          <Box
            display="flex"
            flexDirection={"row"}
            alignItems="center"
            justifyContent={"center"}
            margin={"auto"}
            padding={"5px "}
          >
            <ToggleButton
              value={""}
              onClick={() => {
                setisProfessional(true);
              }}
              sx={{
                ":hover": {
                  backgroundColor: `${isProfessional ? "#2A9F94" : "#ffff"} `,
                },
                width: "180px",
                backgroundColor: isProfessional ? "#119185" : "#ffff",
                color: !isProfessional ? "#119185" : "#ffff",
              }}
            >
              Professional
            </ToggleButton>

            <ToggleButton
              value={""}
              onClick={() => {
                setisProfessional(false);
              }}
              sx={{
                ":hover": {
                  backgroundColor: `${!isProfessional ? "#2A9F94" : "#ffff"} `,
                },
                width: "180px",
                backgroundColor: !isProfessional ? "#2A9F94" : "#ffff",
                color: isProfessional ? "#2A9F94" : "#ffff",
              }}
            >
              Employer
            </ToggleButton>
          </Box>
          <span
            style={{ color: "red", marginRight: "auto", paddingLeft: "20px" }}
          >
            {errorName}
          </span>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
            placeholder="Full Name"
            type={"text"}
            sx={{ width: "360px" }}
            onChange={(e) => setname(e.target.value)}
            onKeyUp={() => {
              handleName();
            }}
          />
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
            {errorPhone}
          </span>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <Phone style={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            }}
            margin="normal"
            variant="outlined"
            placeholder="Phone Number"
            type={"number"}
            sx={{ width: "360px" }}
            onChange={(e) => setphone(e.target.value)}
            onKeyUp={() => {
              handlePhone();
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
            Create account
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default SignUp;
