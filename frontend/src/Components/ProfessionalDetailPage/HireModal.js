import React, { useEffect } from "react";
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AlertContext } from "../../contexts/contexts";
import {
  useJsApiLoader,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import { Add, LocationCity } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  phone: "",
  gender: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };
  }
}

export default function HireModal({ id }) {
  const [open, setOpen] = useState(true);
  const { locationEditModal, setLocationEditModal } = useContext(AlertContext);
  const { openModal, setOpenModal } = React.useContext(AlertContext);
  const cancelButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCpByRKXd_QrQvN6NUJzu-i8sZGv7-mU_4",
    libraries,
  });
  const [location, setLocation] = useState("");
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
const [gender, setGender] = useState('');
 

  const locationRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault()
console.log(location)


    try {
  


    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
    


    return () => {};
  }, []);

 

  const getUser = async () => {
    const user = await JSON.parse(localStorage.getItem("userInfo"));

    setUser(user);
    setName(user.username)
    setEmail(user.email)
  };
  console.log(user);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpenModal(false)}
      >
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
          <div className="flex  mt-20  items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative   transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Send quote
                    </Dialog.Title>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4 max-w-xl m-auto mt-5">
                        <div className="col-span-2 lg:col-span-1">
                          <TextField
                            // value={user.username}
                            style={{ width: "100%" }}
                            variant="outlined"
                            label="Name"
                            value={user.username}
                          />
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                          <TextField
                            // value={user.email}
                            style={{ width: "100%" }}
                            variant="outlined"
                            label="Email"
                            value={user.email}
                            required
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
                        </div>{" "}
                        <div className="col-span-2 lg:col-span-1">
                          <Autocomplete>
                            <TextField
                              style={{
                                width: "100%" ,
                                borderRadius: "5px",
                              }}
                              placeholder=" your location"
                              ref={locationRef}
                              onChange={(e)=>setLocation(e.target.value)}
                            />
                            
                          </Autocomplete>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                          <FormControl required>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Patient's Gender
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
                        <div className="col-span-2 lg:col-span-1">

                 <Button type="submit" variant="outlined" color="success" >Send</Button>             
           


                        </div>




                      </div>
                    </form>

                    <div className="md:flex">
                      <div className=" "></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
