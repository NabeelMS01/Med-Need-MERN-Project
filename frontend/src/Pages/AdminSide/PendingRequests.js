 
import React, { useContext, useEffect, useState } from 'react'
import MiniDrawer from '../../Components/AdminHeader/AdminNav'
 
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import axios from "axios";
import ViewProfile from '../../Components/ViewProfile/ViewProfile';
import { AlertContext } from '../../contexts/contexts';

function PendingRequests() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profiledata,setprofiledata]=useState([])
    const {view,setview}=useContext(AlertContext)
    const open = Boolean(anchorEl); 

 const [viewProfile,setviewProfile]=useState([])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    



    useEffect(() => {
        getProfessionalsRequests();
    
        return () => {};
      }, [view]);
    
    function getProfessionalsRequests(){
try {
     axios.get('/user-profiles').then(({data})=>{

 if(data){
    setprofiledata(data)
 }

 })




} catch (error) {
    console.log(error)
}


    }
    
    console.log(profiledata);
  return (
    <MiniDrawer>

{ !view ?  <> <Typography variant='h6' >Pending Requests</Typography>


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
                        
                        
                          
                          
                     {    profiledata ? profiledata.map((data,index)=>(
   data.approval_status &&  <>  <tr  >
 <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
     {index+1}
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
       color:   "red" ,
       fontWeight: "bold",
     }}
   >
   
    {data.approval_status} 
   </Typography>
 </td>

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
          setAnchorEl(false)
           setviewProfile(data)
           setview(true)
         }}
       >
         View Profile
       </MenuItem>
       {"user.status" ? (
         <MenuItem
           onClick={() => {
           //   BlockUser(user._id);
           }}
         >
           Block
         </MenuItem>
       ) : (
         <MenuItem
           onClick={() => {
           //   UnBlockUser(user._id);
           }}
         >
           Unblock
         </MenuItem>
       )}
       <MenuItem
         onClick={() => {
           // handleViewTransaction(user._id);
         }}
       >
         VIew Transaction
       </MenuItem>

       <MenuItem
     
         onClick={() => {
           // handleEdit(user._id);
         }}
       >
         Edit
       </MenuItem>
     </Menu>
   </div>

  
 </td>
</tr> </>

                     ))  :null   }
                          
                        
                      </tbody>
                    </table>

                    {/* ------------------edit modal outside of the map ------------------------ */}

                    {/* {editUser ? <EditUser data={userData} /> : null} */}
                  </div>
                </div>  

                </>:<ViewProfile data={profiledata[0]} />  }
    </MiniDrawer>
  )
}

export default PendingRequests