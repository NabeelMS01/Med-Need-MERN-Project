import React, { useContext, useEffect, useState } from "react";
import AddCategory from "../../Components/AddCategory/AddCategory";
import MiniDrawer from "../../Components/AdminHeader/AdminNav";
import { AlertContext } from "../../contexts/contexts";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import axios from "axios";
function ManageCategory() {
  const { addCatState, setaddCatState } = useContext(AlertContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
const [categories,setCategories]= useState([])
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const activate = (id) => {};

  const deactivate = (id) => {};
  const handleDelete = (id) => {};
useEffect( () => {
     axios.get('/admin/get-all-professions').then(({data})=>{
 

 setCategories(data)

   })
  
}, [ ]);


  return (
    <div>
      <MiniDrawer>
        {addCatState ? (
          <AddCategory />
        ) : (
          <>
            <Button
              style={{ backgroundColor: "#257069", color: "white" }}
              onClick={() => setaddCatState(true)}
              variant="contained"
            >
              Add category
            </Button>

            <table className="table    text-gray-400 border-separate space-y-6 text-sm w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    SL No
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
                    Hiring type
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
                {categories.map((category,index)=>(

<>
                   
                    <tr key={index} >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                     {index+1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {category.profession_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                         {category.hiring_type}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Typography
                          style={{
                            color:category.status ? "green" : "red"  ,
                            fontWeight: "bold",
                          }}
                        >
                              {category.status?"Active":"Deactive"}
                        </Typography>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <div>
                          <MoreVertRoundedIcon
                            sx={{ cursor: "pointer" }}
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
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
                            {category.status ? (
                              <MenuItem
                                onClick={() => {
                                  deactivate(category._id);
                                }}
                              >
                                Deactivate
                              </MenuItem>
                            ) : (
                              <MenuItem
                                onClick={() => {
                                  activate(category._id);
                                }}
                              >
                                activate
                              </MenuItem>
                            )}

                            <MenuItem
                              onClick={() => {
                                handleDelete();
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </td>
                    </tr>{" "}
                  </>
                ) )
                  
                }
              </tbody>
            </table>
          </>
        )}
      </MiniDrawer>
    </div>
  );
}

export default ManageCategory;
