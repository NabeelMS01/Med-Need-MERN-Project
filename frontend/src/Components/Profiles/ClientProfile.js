import { Avatar, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
 
import UserDrawer from "../UserDashboard/UserDrawer";
import moment from "moment";

function ClientProfile() {

  const [profileImg, setProfileImg] = useState({});
  const [resume, setResume] = useState({});
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  let ProfileData;

  useEffect(() => {
    getProfileData();
  }, []);

  async function getProfileData() {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"));

    await axios.get(`/profile/${token.accessToken}`).then(async ({ data }) => {
      ProfileData = await data;

      setUserData(data);
      setProfileImg(data.profile.profile_img);
      setUserProfile(data.profile);
       setResume(data.profile.resume)
    });
    } catch (error) {
       
    }
   
  }
 let birthdate=moment(userProfile.date_of_birth).format("L")
console.log(userData);







  return (
    <div>
      <UserDrawer>
        <div class="container mx-auto my-5 p-5">
          <div class="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div class="w-full md:w-3/12 md:mx-2">
              {/* <!-- Profile Card --> */}
              <div class="bg-white p-3 border-t-4 border-green-400">
                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  
                  <li class="flex items-center py-3">
                    <span>Member since</span>
                    <span class="ml-auto">{ moment(userData.createdAt).format('LL')}</span>
                  </li>
                </ul>
                <div class="image overflow-hidden">
                  <img
                    class="h-auto w-full mx-auto"
                    src={`${profileImg.url ||'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg' }  `}
                     
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
                      <div class="px-4 py-2">{userProfile.gender||"Not updated"}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Contact No.</div>
                      <div class="px-4 py-2">{userData.phone}</div>
                    </div>

                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div class="px-4 py-2">
                  { userProfile.address ? <>   {userProfile.address} {userProfile.state}{" "}
                        {userProfile.country}</> :"Address not updated" }
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
                 {userProfile.experience?   <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Experiance.</div>
                      <div class="px-4 py-2">
                    {  userProfile.experience}
                      </div>
                    </div> :null }


                     
                  </div>
                </div>
        {resume.url? <a href={ ` ${resume.url}`} target={"_blank"} >       <button
                  class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                 
                >
                  Click to View Resume
                </button></a>: null}
              </div>
              {/* <!-- End of about section --> */}

              <div class="my-4"></div>

              {/* <!-- Experience and education --> */}
            
              {/* <!-- End of profile tab --> */}
            </div>
          </div>
        </div>
      </UserDrawer>
    </div>
  );
}

export default ClientProfile;
