import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AlertContext } from "../../contexts/contexts";
import { Input } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ResumeModal({props}) {

  const {public_id,profile_id }=props;
  const { openModal, setOpenModal } = useContext(AlertContext);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  
  const [file, setFile] = useState();

const navigate =useNavigate()

  
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      if (file) {
     let formData = new FormData();    
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
      
        formData.append("resume", file);
        formData.append("public_id", public_id );
      formData.append("profile_id", profile_id );
       


      console.log(formData);
await axios.post('/update-resume',formData,config).then((response)=>{

  if(response){
    swal('Resume updated succesfully').then(()=>{
      setOpenModal(false)
  
      
    })
  }

})




      }
    } catch (error) {
     
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            {" "}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload resume
            </Typography>
            <Input
              type="file"
              onChange={(e) => {
                handleFile(e);
              }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              color="success"
              type="submit"
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
