import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import UserDrawer from "../UserDashboard/UserDrawer";
import moment from "moment";
import { AlertContext } from "../../contexts/contexts";
import swal from "sweetalert";

function ViewProfile({ data }) {
  const { view, setview } = useContext(AlertContext);
  const [profileImg, setProfileImg] = useState({});
  const [resume, setResume] = useState({});
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [state, setState] = useState(false);


  
  let ProfileData;

  useEffect(() => {
    getProfileData();

    setUserData(data.userdata);
  }, [state]);

  async function getProfileData() {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"));
      setProfileImg(data.profile.profile_img);
      setUserProfile(data.profile);
      setResume(data.profile.resume);

      ProfileData = data;
    } catch (error) {}
  }

  const handleAccept = async (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "You want to approve this profile",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.get(`/accept-profile/verified/${id}`).then((res) => {
            if (res) {
              swal("User has been approve!", {
                icon: "success",
              }).then((res)=>{
                setview(false)
              });
            }
          });
        }
      });
    } catch (error) {}
  };
  const handleDecline = async (id) => {
    console.log(id);

    try {
      swal({
        title: "Are you sure?",
        text: "You want to decline this profile",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.get(`/accept-profile/declined/${id}`).then((res) => {
            if (res) {
              swal("User has been declined!", {
                icon: "success",
              }).then((res)=>{
                setview(false)
              });
              
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let birthdate = moment(data.date_of_birth).format("L");
  console.log(data);

  return (
    <div>
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div class="w-full md:w-3/12 md:mx-2">
            {/* <!-- Profile Card --> */}
            <div class="bg-white p-3 border-t-4 border-green-400">
              <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                  <span>Status</span>
                  <span class="ml-auto">
                    {data.approval_status == "pending" ? (
                      <span class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        pending
                      </span>
                    ) : data.approval_status == "declined" ? (
                      <span class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        declined
                      </span>
                    ) : data.approval_status == "verified" ? (
                      <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    ) : (
                      <span class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        Inactive
                      </span>
                    )}{" "}
                  </span>
                </li>
                <li class="flex items-center py-3">
                  <span>Member since</span>
                  <span class="ml-auto">
                    {moment(userData.createdAt).format("LL")}
                  </span>
                </li>
              </ul>
              <div class="image overflow-hidden">
                <img
                  class="h-auto w-full mx-auto"
                  src={`${
                    data.profile_img.url ||
                    "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
                  }  `}
                />
              </div>
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                {userData.name}
              </h1>
            </div>
            {/* <!-- End of profile card --> */}
            <div class="my-4"></div>
            {/* <!-- Friends card --> */}
            <div class="bg-white p-3 hover:shadow">
              <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"></div>
            </div>
            {/* <!-- End of friends card --> */}
          </div>
          {/* <!-- Right Side --> */}
          <div class="w-full md:w-9/12 mx-2 h-64">
            {/* <!-- Profile tab -->
                <!-- About Section --> */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">Details</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Full Name</div>
                    <div class="px-4 py-2">{userData.name}</div>
                  </div>

                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Gender</div>
                    <div class="px-4 py-2">
                      {userProfile.gender || "Not updated"}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                    <div class="px-4 py-2">{userData.phone}</div>
                  </div>

                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Permanant Address</div>
                    <div class="px-4 py-2">
                      {data.address ? (
                        <>
                          {" "}
                          {data.address} {data.state}
                          {data.country}
                        </>
                      ) : (
                        "Address not updated"
                      )}
                    </div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email.</div>
                    <div class="px-4 py-2">
                      <a
                        class="text-blue-800"
                        href={`mailto:${userData.email}`}
                      >
                        {userData.email}
                      </a>
                    </div>
                  </div>
                  {data.experience ? (
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Experiance.</div>
                      <div class="px-4 py-2">{data.experience}</div>
                    </div>
                  ) : null}

                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Age</div>
                    <div class="px-4 py-2">
                      {data.date_of_birth
                        ? moment().diff(birthdate, "years")
                        : "Not updated"}
                    </div>
                  </div>
                </div>
              </div>
              {data.resume.url ? (
                <a href={` ${data.resume.url}`} target={"_blank"}>
                  {" "}
                  <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    Click to View Resume
                  </button>
                </a>
              ) : null}
             
            </div>
            {/* <!-- End of about section --> */}

            <div class="my-4"></div>

            {/* <!-- Experience and education --> */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="grid grid-cols-2">
                <div>
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">About me</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500"></span>
                  </div>
                </div>
              </div>

              <p>{data.about}</p>

              {/* <!-- End of Experience and education grid --> */}
            </div>
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="grid grid-cols-3 m-auto">
                <div>
                { data.approval_status=="verified"? <Button
                    variant="contained"
                    color="success"
                   disabled
               
                  >
                    Verify
                  </Button> : <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleAccept(data._id);
                    }}
               
                  >
                    Verify
                  </Button>   }
                </div>
                <div>
                 { data.approval_status=='declined'?
                  <>
                  <Button disabled variant="contained" color="error">
                    decline 
                  </Button ></> 
                 
                
                  : <> <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleDecline(data._id);
                    }}
                  >
                    decline
                  </Button> </>
                 }
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setview(false);
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </div>

              {/* <!-- End of Experience and education grid --> */}
            </div>

            {/* <!-- End of profile tab --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;