import React, { useContext, useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import { AlertContext } from "../../contexts/contexts";

import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
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
  Typography,
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
import { Add } from "@mui/icons-material";

const style = {
  position: "absolute",
   top:"5%",
  right: "5%",
  left: "5%",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal(props) {
  const [fileData, setFileData] = useState();
  const [img, setImg] = useState();
  const [data, setData] = useState({});
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

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState();
  const [file, setFile] = useState();
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { editModal, setEditModal } = useContext(AlertContext);
  const { errMsg, setErrMsg } = useContext(AlertContext);
  const handleOpen = () => setEditModal(true);
  const handleClose = () => setEditModal(false);

  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddLang = () => {
    if (language) {
      setLanguages([...languages, language]);
      setLanguage("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     

      const formData = new FormData();

      formData.append("address", address);
      formData.append("profile_img", fileData);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("mobile", parseInt(mobile));
      formData.append("profession", profession);
      formData.append("about", about);
      formData.append("languages", languages);
      formData.append("pincode", parseInt(pincode));
      // formData.append("token", JSON.parse(localStorage.getItem("userInfo")).token);
      formData.append("public_id", userProfile.profile_img.public_id);
      console.log("hello");
      const form = {
        address: address,
        profile_img: fileData,
        country: country,
        mobile: mobile,
        profession: profession,
        about: about,
        languages: languages,
        pincode: parseInt(pincode),
        public_id: userProfile.profile_img.public_id,
      };

      const config = {
        headers: {
          "Content-type": "application/json",
          token: user.accessToken,
        },
      };
      //  if( address&&pincode&&languages&&pincode&&about&&mobile&&state&&address

      //  )
      console.log("hello");
      await axios
        .post("/update-profile-data", form, config)
        .then((response) => {
         
        });
    } catch (error) {}
  };

  const handleProfession = (event) => {
    setProfession(event.target.value);
  };
  const handleProfilePic = (e) => {
    setFileData(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  async function getProfileData() {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"));
      if (languages) {
        await axios
          .get(`/profile/${token.accessToken}`)
          .then(async ({ data }) => {
            setUserData(data);

            setUserProfile(data.profile);
          });
      } else setErrMsg("please enter your language");
    } catch (error) {}
  }

  useEffect(() => {
    getProfessionList();
    getProfileData();
    setFileData();
  }, []);

  async function getProfessionList() {
    try {
      setAddress(userProfile.address);
      setPincode(userProfile.pincode);
      setState(userProfile.state);
      setCountry(userProfile.country);
      setMobile(userProfile.mobile);
      setAbout(userProfile.about);
      setProfession(userProfile.profession);
      setUser(JSON.parse(localStorage.getItem("userInfo")).token);

      await axios.get("/getAllProfessions").then(({ data }) => {
        setprofessionList(data);
      });
    } catch (error) {
      setErrMsg(error.response.message);
    }
  }

  return (
    <div>
      <Modal
        open={editModal}
        onClose={handleClose}
        sx={{ overflow: "scroll", }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
              <div className="col-span-2 lg:col-span-1">
                <TextField
                  // value={props.name}
                  style={{ width: "100%" }}
                  variant="outlined"
                  label="Name"
                  value={userProfile&&userProfile.name    }
                  disabled
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  label="Address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={userProfile&&userProfile.address}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <TextField
                  type={"tel"}
                  style={{ width: "100%" }}
                  variant="outlined"
                  label="Pincode"
                  required
                  defaultValue={userProfile&&userProfile.pincode}
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
                  defaultValue={userProfile&&userProfile.state}
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
                  defaultValue={userProfile&&userProfile.country}
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
                  defaultValue={userProfile&&userProfile.mobile}
                  required
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
                    defaultValue={userProfile&&userProfile.profession}
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

              {languages.length != 0 ? (
                <div className="col-span-2 lg:col-span-1">
                  <Stack direction="row" spacing={1} width={"100%"}>
                    {languages.map((data, index) => (
                      <Chip key={index} label={data} />
                    ))}
                  </Stack>{" "}
                </div>
              ) : null}

              <div className="col-span-2">
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  label="About"
                  type={"text"}
                  multiline
                  minRows={"4"}
                  onChange={(e) => setAbout(e.target.value)}
                  defaultValue={userProfile&&userProfile.about}
                  required
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
                        style={{
                          color: "white",
                          height: "18px",
                          width: "18px",
                        }}
                      />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errMsg + "!"}
              </Alert>
            </Snackbar>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
