import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../Components/AdminHeader/AdminNav";

import { Button, MenuItem, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import axios from "axios";
import ViewProfile from "../../Components/ViewProfile/ViewProfile";
import { AlertContext, ComponentContext } from "../../contexts/contexts";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
function PendingRequests() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profiledata, setprofiledata] = useState([]);
  const { view, setview } = useContext(AlertContext);
  const open = Boolean(anchorEl);

  const [profile, setviewProfile] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    getProfessionalsRequests();

    return () => {};
  }, [view]);

  function getProfessionalsRequests() {
    try {
      axios.get("/user-profiles").then(({ data }) => {
        if (data) {
          setprofiledata(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  let data;

  function setData(data) {
    
     setviewProfile(data)
  setview(true);
  }

  return (
    <MiniDrawer>
      {!view ? (
        <>
          {" "}
          <Typography variant="h6">Pending Requests</Typography>
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="table   pb-36   text-gray-400 border-separate space-y-6 text-sm w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Contact
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {profiledata
                    ? profiledata.map(
                        (data, index) =>
                          data.approval_status && (
                            <>
                              <tr key={index}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {data.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {data.email}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                  +91{data.mobile}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                  <Typography
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {data.approval_status}
                                  </Typography>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                  <div>
                                   

                                    <Menu
                                      as="div"
                                      className="relative inline-block text-left"
                                    >
                                      <div>
                                        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                        <MoreVertRoundedIcon
                                      sx={{ cursor: "pointer" }}
                                      id="basic-button"
                                      
                                      aria-haspopup="true"
                                     
                                     
                                    ></MoreVertRoundedIcon>
                                        </Menu.Button>
                                      </div>

                                      <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                      >
                                        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <div className="py-1">
                                            <Menu.Item  >
                                              {({ active }) => (
                                                <a
                                                  onClick={()=>setData(data)}
                                                  className={classNames(
                                                    active
                                                      ? "bg-gray-100 text-gray-900"
                                                      : "text-gray-700",
                                                    "block px-4 py-2 text-sm"
                                                    ,"cursor-pointer"
                                                  )}
                                                >
                                                  view profile
                                                </a>
                                              )}
                                            </Menu.Item>
                                             
                                          </div>
                                        </Menu.Items>
                                      </Transition>
                                    </Menu>
                                  </div>
                                </td>
                              </tr>
                            </>
                          )
                      )
                    : null}
                </tbody>
              </table>

              {/* ------------------edit modal outside of the map ------------------------ */}

              {/* {editUser ? <EditUser data={userData} /> : null} */}
            </div>
          </div>
        </>
      ) : (
        <ViewProfile profile={profile} />
      )}
    </MiniDrawer>
  );
}

export default PendingRequests;
