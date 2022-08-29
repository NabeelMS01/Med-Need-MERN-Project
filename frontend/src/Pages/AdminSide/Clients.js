 
import React, { useEffect, useState } from "react";
import MiniDrawer from '../../Components/AdminHeader/AdminNav'
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import axios from "axios";



function Clients() {
 
  const [userData, setuserData] = useState([]);
  const [state, setState] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    getProfessionals();

    return () => {};
  }, [anchorEl]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getProfessionals = async () => {
    axios.get("/get-all-users").then((data) => {
      setuserData(data.data);
    });
  };
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const handleView = () => {
    console.log("view");
  };

  const BlockUser = async (id) => {
    try {
      console.log("block");
      await axios
        .post(
          "/block-user",
          {
            _id: id,
          },
          config
        )
        .then(({ data }) => {
          const { blockUnblock } = data;
          if (blockUnblock) {
            setAnchorEl(null);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const UnBlockUser = async (id) => {
    console.log("unblock");
    try {
      console.log("block");
      await axios.post(
        "/unblock-user",
        {
          _id: id,
        },
        config
      ) .then(({ data }) => {
        const { blockUnblock } = data;
        if (blockUnblock) {
          setAnchorEl(null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewTransaction = () => {
    console.log("handleViewTransaction");
  };
  const handleEdit = () => {
    console.log("handleViewTransaction");
  };
  const count=0
  return (<div>
    <MiniDrawer>
      <div className="flex ">
        <div className=" "></div>
        {/* {  showAddUser?   <AddUser/> :null} */}
        <div className="flex-1  mt-10  ">
          <div>
            <div className=" ">
              <div className="overflow-visible ">
                <button
                  onClick={() => {
                    setShowAddUser(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
                >
                  Add User
                </button>
                <div className="p-1.5 w-full inline-block align-middle">
                  <div className="overflow-hidden border rounded-lg">
                    <table className="table    text-gray-400 border-separate space-y-6 text-sm w-full">
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
                        { 
                        userData.map((user, index) =>
                          user.is_employer ? (
                          
                            <tr key={index}>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {count + 1}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {user.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {user.email}
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                +91 {user.phone}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <Typography
                                  style={{
                                    color: user.status ? "green" : "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {" "}
                                  {user.status ? "active" : "Blocked"}{" "}
                                </Typography>
                              </td>

                              {/* ---------------------------------  Edit button --------------- */}

                              {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">



                          <a
                            onClick={() => {
                              setEditUser(true);
                              setuserData(user);
                              console.log(editUser);
                            }}
                            className="text-red-500  hover:text-red-700 cursor-pointer"
                          >
                            Edit
                          </a>
                        </td> */}
                              {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">


                          <a
                            onClick={
                              ()=>{
                                deleteUser(user._id)
                              }
                            }
                            className="text-red-500  hover:text-red-700 cursor-pointer"
                          >
                            Delete  
                          </a>
                        </td> */}

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <div>
                                  <MoreVertRoundedIcon
                                    sx={{ cursor: "pointer" }}
                                    id="basic-button"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                  ></MoreVertRoundedIcon>
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                  >
                                    <MenuItem
                                      onClick={() => {
                                        handleView(user._id);
                                      }}
                                    >
                                      View Profile
                                    </MenuItem>
                                    {user.status ? (
                                      <MenuItem
                                        onClick={() => {
                                          BlockUser(user._id);
                                        }}
                                      >
                                        Block
                                      </MenuItem>
                                    ) : (
                                      <MenuItem
                                        onClick={() => {
                                          UnBlockUser(user._id);
                                        }}
                                      >
                                        Unblock
                                      </MenuItem>
                                    )}
                                    <MenuItem
                                      onClick={() => {
                                        handleViewTransaction(user._id);
                                      }}
                                    >
                                      VIew Transaction
                                    </MenuItem>

                                    <MenuItem
                                  
                                      onClick={() => {
                                        handleEdit(user._id);
                                      }}
                                    >
                                      Edit
                                    </MenuItem>
                                  </Menu>
                                </div>

                                {/* {user.status ? (
                            <a
                              className="text-red-500  hover:text-red-700 cursor-pointer"
                              onClick={() => {
                                BlockUser(user._id);
                                setState(false);
                              }}
                            >
                              Block
                            </a>
                          ) : (
                            <a
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => {
                                UnBlockUser(user._id);
                                setState(true);
                              }}
                            >
                              Unblock
                            </a>
                          )} */}
                              </td>
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>

                    {/* ------------------edit modal outside of the map ------------------------ */}

                    {/* {editUser ? <EditUser data={userData} /> : null} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MiniDrawer>
  </div>
  );
}

export default Clients