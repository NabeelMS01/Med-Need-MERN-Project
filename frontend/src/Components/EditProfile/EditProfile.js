import { Typography } from "@material-ui/core";
import { Add, AddBox, Email } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserDrawer from "../UserDashboard/UserDrawer";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/contexts";
function EditProfile({ title }) {
  const [fileData, setFileData] = useState([]);
  const [profileData, setProfileData] = useState();
  const [img, setImg] = useState();

  const [professionList, setprofessionList] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [state, setState] = useState("");
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const {errMsg, setErrMsg} = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleProfilePic = (e) => {
    setProfileData(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfession = (event) => {
    setProfession(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        date &&
        address &&
        country &&
        pincode &&
        country &&
        mobile &&
        profession &&
        gender &&
        about &&
       
        state 
        
      ) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const formData = new FormData();
        formData.append("profile_img", profileData);
        formData.append("resume", fileData);
        formData.append("name", user.username);
        formData.append("email", user.email);
        formData.append("date_of_birth", date);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("country", country);
        formData.append("state", state);
        formData.append("mobile", parseInt(mobile));
        formData.append("profession", profession);
        formData.append("about", about);
        formData.append("languages",  languages);
        formData.append("status", true);
        formData.append("pincode", parseInt(pincode));
        formData.append("token", user.accessToken);

        await axios.post("/edit-profile", formData, config).then((response) => {
          if (response) {
            setLoading(false);
            swal("Success!", "...your application submitted successfully").then(
              (res) => {
                setLoading(false)
                navigate("/dashboard");
              }
            );
          }
        });
      }
    } catch (error) {
      if (error.response.data == "profile pending") {
        handleClick();
        setErrMsg("please upload a profile picture");
      } else if (error.response.data == "resume pending") {
        handleClick();
        setErrMsg("please upload your resume");
      } else {
        handleClick();
        console.log(error.response.data.message);
        setErrMsg(error.response.data);
      }
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUser(JSON.parse(userInfo));
    getProfessionList();
    setName(user.username);
    setEmail(user.email);

    return () => {};
  }, []);

  async function getProfessionList() {
    await axios.get("/getAllProfessions").then(({ data }) => {
      setprofessionList(data);
    });
  }

  const handleAddLang = () => {
    console.log(languages);
    if (language) {
      setLanguages([...languages, language]);
      setLanguage("");
    }
  };

  return (
    <UserDrawer>
      <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">
        <div className="text-3xl mb-6 text-center ">{title}</div>

        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errMsg + "!"}
          </Alert>
        </Snackbar>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
            <div className="col-span-2">
              <div className="m-auto w-28">
                <Button
                  style={{ margin: "auto" }}
                  variant="text"
                  component="label"
                >
                  {img ? (
                    <Avatar sx={{ width: "100px", height: "100px" }}>
                      <img src={img} alt="" />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ width: "100px", height: "100px" }} />
                  )}
                  <input
                    onChange={(e) => handleProfilePic(e)}
                    type="file"
                    name="file"
                    hidden
                  />
                </Button>
              </div>
              <Typography style={{ textAlign: "center" }}>
                Upload Profile picture
              </Typography>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <TextField
                value={user.username}
                style={{ width: "100%" }}
                variant="outlined"
                label="Name"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <TextField
                value={user.email}
                style={{ width: "100%" }}
                variant="outlined"
                label="Email"
                required
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <TextField
                type={"date"}
                style={{ width: "100%" }}
                variant="outlined"
                label="Data of birth"
                placeholder="Data of birth"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label="Address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <TextField
                type={"tel"}
                style={{ width: "100%" }}
                variant="outlined"
                label="Pincode"
                required
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <TextField
                type={"text"}
                style={{ width: "100%" }}
                variant="outlined"
                label="State"
                required
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <TextField
                type={"text"}
                style={{ width: "100%" }}
                variant="outlined"
                label="Country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <TextField
                type={"number"}
                style={{ width: "100%" }}
                variant="outlined"
                label="Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <TextField
                type={"text"}
                style={{ width: "100%" }}
                variant="outlined"
                label="Languages"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Add
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={handleAddLang}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              {/* =================select professions======================= */}
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Profession
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={profession}
                  label="Age"
                  onChange={handleProfession}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {professionList.map((data, index) => (
                    <MenuItem key={index} value={data.profession_name}>
                      {data.profession_name}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {languages.length != 0 ? (
              <div className="col-span-2 lg:col-span-1">
                <Stack direction="row" spacing={1} width={"100%"}>
                  {languages.map((data, index) => (
                    <Chip key={index} label={data} />
                  ))}
                </Stack>{" "}
              </div>
            ) : null}

            <div className="col-span-2 lg:col-span-1">
              <Button
                style={{ width: "90%", marginTop: "20px" }}
                variant="contained"
                component="label"
              >
                Upload Your Resume
                <input
                  onChange={(e) => handleFile(e)}
                  type="file"
                  name="file"
                  hidden
                />
              </Button>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <FormControl required>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  onChange={(e) => setGender(e.target.value)}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="col-span-2">
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label="About"
                type={"text"}
                multiline
                minRows={"4"}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="col-span-2 text-right m-auto">
              <Button
                variant="contained"
                style={{ width: "150px" }}
                sx={{
                  backgroundColor: "#257069",
                  ":hover": { backgroundColor: "#257069" },
                }}
                type="submit"
              >
                {loading ? (
                  <div>
                    <CircularProgress
                      style={{ color: "white", height: "18px", width: "18px" }}
                    />
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </UserDrawer>
  );
}

export default EditProfile;
