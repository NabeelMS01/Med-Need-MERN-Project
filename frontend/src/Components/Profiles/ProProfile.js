import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import UserDrawer from "../UserDashboard/UserDrawer";
import moment from "moment";
import { AlertContext } from "../../contexts/contexts";
import ResumeModal from "./ResumeModal";
import EditModal from "./ProfileEditModal";

function ProfessionalProfile() {
  const { openModal, setOpenModal } = useContext(AlertContext);
  const { editModal, setEditModal } = useContext(AlertContext);
  const [profileImg, setProfileImg] = useState({});
  const [resume, setResume] = useState({});
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [resumeData, setResumeData] = useState({});


  let ProfileData;
 useEffect(() => {
  getProfileData();
   }, []);

  async function getProfileData() {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"));

      await axios
        .get(`/profile/${token.accessToken}`)
        .then(async ({ data }) => {
          ProfileData = await data;

          setUserData(data);
          setProfileImg(data.profile.profile_img);
          setUserProfile(data.profile);
          setResume(data.profile.resume);
        });
    } catch (error) {}
  }
  let birthdate = moment(userProfile.date_of_birth).format("L");

  function handleResume(id, public_id) {
    setResumeData({ public_id, profile_id: id });

    setOpenModal(true);
  }

  const handleEditProfile = () => {
    setEditModal(true);
  };

  return (
    <div>
      <UserDrawer>
        <ResumeModal props={resumeData} />
        <EditModal id={userProfile._id} />
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* <!-- Profile Card --> */}
              <div className="bg-white p-3 border-t-4 border-green-400">
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {userProfile.approval_status == "pending" ? (
                        <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                          pending
                        </span>
                      ) : userProfile.approval_status == "declined" ? (
                        <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                          declined
                        </span>
                      ) : userProfile.approval_status == "approved" ? (
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                          Inactive
                        </span>
                      )}{" "}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {moment(userData.createdAt).format("LL")}
                    </span>
                  </li>
                </ul>
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={`${
                      profileImg.url ||
                      "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
                    }  `}
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {userData.name}
                </h1>
              </div>
              {/* <!-- End of profile card --> */}
              <div className="my-4"></div>
              {/* <!-- Friends card --> */}
              <div className="bg-white p-3 hover:shadow">
                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"></div>
              </div>
              {/* <!-- End of friends card --> */}
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab -->
                <!-- About Section --> */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Details</span>{" "}
                  <Button
                    onClick={() => {
                      handleEditProfile();
                    }}
                    style={{ marginLeft: "auto" }}
                  >
                    Edit Profile
                  </Button>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Full Name</div>
                      <div className="px-4 py-2">{userData.name}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">
                        {userProfile.gender || "Not updated"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{userData.phone}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">
                        {userProfile.address ? (
                          <>
                            {" "}
                            {userProfile.address} {userProfile.state}{" "}
                            {userProfile.country}
                          </>
                        ) : (
                          "Address not updated"
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href={`mailto:${userData.email}`}
                        >
                          {userData.email}
                        </a>
                      </div>
                    </div>
                    {userProfile.experience ? (
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Experiance.
                        </div>
                        <div className="px-4 py-2">
                          {userProfile.experience}
                        </div>
                      </div>
                    ) : null}

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Age</div>
                      <div className="px-4 py-2">
                        {userProfile.date_of_birth
                          ? moment().diff(birthdate, "years")
                          : "Not updated"}
                      </div>
                    </div>

                    {resume.url ? (
                      <a href={` ${resume.url}`} target={"_blank"}>
                        {" "}
                        <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                          Click to View Resume
                        </button>
                      </a>
                    ) : null}
                    <button
                      onClick={() => {
                        handleResume(userProfile._id, resume.public_id);
                      }}
                      className="block w-full text-green-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    >
                      Upload resume
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- End of about section --> */}

              <div className="my-4"></div>

              {/* <!-- Experience and education --> */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">About me</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500"></span>
                    </div>
                  </div>
                </div>

                <p>{userProfile.about}</p>

                {/* <!-- End of Experience and education grid --> */}
              </div>

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"></div>
                  </div>
                </div>

                {/* <!-- End of Experience and education grid --> */}
              </div>

              {/* <!-- End of profile tab --> */}
            </div>
          </div>
        </div>
      </UserDrawer>
    </div>
  );
}

export default ProfessionalProfile;
