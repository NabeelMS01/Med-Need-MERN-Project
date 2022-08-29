import { Email, Home, Key } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Input, InputAdornment, InputLabel, MenuItem,   TextField, Typography,  } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import { AlertContext } from '../../contexts/contexts';
import swal from 'sweetalert';
function AddCategory() {
     
  const navigate = useNavigate();
 
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [progressBar, setprogressBar] = useState(false);
  const [errormessage, seterrormessage] = useState(false);
  const [hiringType, setHiringType] = useState("");


  
  // =================================================================
  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPhone, seterrorPhone] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const {addCatState,setaddCatState } =useContext(AlertContext)
  const [fileData,setFileData]=useState([])


  // ================================================================
 const  handleFile= (e)=> {
    console.log(e.target.files );
    setFileData(e.target.files[0])
     
   };

  const handleName = () => {
    seterrormessage(false);
    if (name.length <= 0) {
      seterrorEmail("Name cannot be empty");
      return false;
    }  else {
      seterrorEmail(null);
      return true;
    }
  };
 
  const handleSubmit = async (e) => {
    seterrormessage(false);
    e.preventDefault();
    if (!handleName()  ) {
    } else if (!handleName()  ) {
    } else {
      try {
        setprogressBar(true);

        const config = {
          header: {
            "content-type": "application/json",
          },
        };
 let file = fileData
    const     formdata=new FormData()
        formdata.append('image',file)
formdata.append('name',name)
  formdata.append('hiring_type',hiringType)      
        await axios
          .post(
            "/admin/add-profession",
             formdata,
            config
          )
          .then(async ({ data }) => {
            console.log(data);
           
 if(data){
    swal("success", "profession has been added!", "success").then(()=>{
      setprogressBar(false);
    })
 }
           
          
          })
          .catch((err) => {
            setprogressBar(false);
            
          });
      } catch (err) {
        seterrormessage("error occured");
        setprogressBar(false);
      }
    }
  };

 
  return (
    <div>
        
        
 
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
            style={{ marginRight: "auto", padding: "20px" }}
            variant="h5"
          >
             Add Profession
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
             
            margin="normal"
            variant="outlined"
            placeholder="Name"
            type={"text"}
            sx={{ width: "360px" }}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={() => {
              handleName();
            }}
          /> 
        <Button
        style={{width:"90%"}}
  variant="contained"
  component="label"
>
  Upload Banner Image
  <input
  onChange={(e)=>handleFile(e)}
    type="file"
    name='file'
    hidden
  />
</Button>

         
           <InputLabel sx={{ marginRight: "auto", marginLeft: "20px" }} id="demo-select-small">Select hiring type</InputLabel>
           <Select 
              sx={{ width: "360px" }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={ hiringType}
              label="Hiring type"
              onChange={(e) => setHiringType(e.target.value)}
              required
            ><MenuItem >Select </MenuItem>
              <MenuItem value={"Daily"}>Daily</MenuItem>
              <MenuItem value={"Hourly"}>Hourly</MenuItem>
            </Select>

          <Box
           sx={
            {
                display:"flex",
                flexDirection:"row",
                justifyContent:"center"
            }
           }
          >

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              marginRight: "20px",
              width: "160px",
              backgroundColor: "#238279",
              ":hover": { backgroundColor: "#2A9F94 " },
            }}
          >
      
   {  progressBar? <Box
          sx={{
            
            
            width:"20px",height:"20px",
           
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{width:"25px",height:"25px",color: "white",}}  />
        </Box>
      
      
        :    "Submit"}
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={()=>setaddCatState(false)}
            sx={{
              marginTop: "20px",
              marginLeft: "20px",
              width: "160px",
              backgroundColor: "red",
              ":hover": { backgroundColor: "#ff4545 " },
            }}
          >
            Cancel
          </Button>
          </Box>
        </Box>
      </form>
    </div>
 


    </div>
  )
}

export default AddCategory