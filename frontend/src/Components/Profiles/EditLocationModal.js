// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { AlertContext } from "../../contexts/contexts";
// import { Input } from "@material-ui/core";
// import { Grid, TextField } from "@mui/material";
// import { useJsApiLoader, Autocomplete, useLoadScript } from "@react-google-maps/api";
// import LoadingSkelton from "../LoadingSkelton/Skeliton";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,

// };

//   function EditLocation({ id }) {
    
//   const { locationEditModal, setLocationEditModal } =
//     React.useContext(AlertContext);
//   const handleOpen = () => setLocationEditModal(true);
//   const handleClose = () => setLocationEditModal(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const libraries=["places"];
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCpByRKXd_QrQvN6NUJzu-i8sZGv7-mU_4",
//     libraries,
//   });

//   return (
//     <div>
//       <Modal
//         open={locationEditModal}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         sx={{zIndex:"10px"}}
//       >
         
//           <>
//             {" "}
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 Update your location
//               </Typography>

//               <Grid sx={{ margin: "10px" ,  zIndex :"50px" }}>

//             <Autocomplete   >  
//                    <TextField
//                   variant="outlined"
//                   label="Enter your location"
//                   placeholder="Enter your location"
//                   size="small"
//                 />
                
                
//                 </Autocomplete>
             



//                 <Button
//                   style={{ marginLeft: "5px",}}
//                   color="success"
//                   variant="outlined"

//                 >
//                   Update
//                 </Button>
//               </Grid>
//             </Box>
//           </>
     
//       </Modal>
//     </div>
//   );
// }


// export default  EditLocation; 
import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { AlertContext } from '../../contexts/contexts';
 import { useJsApiLoader, Autocomplete, useLoadScript } from "@react-google-maps/api";
import { LocationCity } from '@mui/icons-material';
import { CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
export default function EditLocation({id}) {
  const [open, setOpen] = useState(true)
  const { locationEditModal, setLocationEditModal } = useContext(AlertContext);
  const cancelButtonRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const libraries=["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpByRKXd_QrQvN6NUJzu-i8sZGv7-mU_4",
    libraries,
  });
const[location,setLocation]=useState('')
const locationRef =useRef()
  const handleSubmit= async(id)=>{
    try {
        console.log(locationRef.current.value);
        setIsLoading(true)
        await axios.get(`/update-professionals-location/${id}/${locationRef.current.value}`).then((response)=>{
            console.log(response);
        })


        setIsLoading(false)
    } catch (error) {
        console.log(error);
        setIsLoading(false)
    }


  }
  return (
    <Transition.Root show={locationEditModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setLocationEditModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                       <LocationCity/>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                       Update Location
                      </Dialog.Title>
                      <div className="mt-10">
                         <Autocomplete>
      {/* <TextField   label="Enter your Location"  size='small'  /> */}

      <input  style={{height:"35px",border:".5px"}} placeholder='search your location' ref={locationRef}   />

                         </Autocomplete>
   


                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                 
                  <button
                    type="button"
                    className="mt-3 w-40 inline-flex   justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleSubmit(id)}
                    
                  >
                {!isLoading? <> Update   </>  :  <CircularProgress style={{width:"20px",height:"20px"}} />  }
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}