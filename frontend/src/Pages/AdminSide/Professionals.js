import React, { useEffect } from "react";
import MiniDrawer from "../../Components/AdminHeader/AdminNav";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { DataGrid } from '@mui/x-data-grid';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Professionals() {

 useEffect(() => {
 
 getProfessionals()


  return () => {
     
  };
}, []);

const getProfessionals=  async()=>{
  axios.get('/admin-professionals').then((data)=>{
    console.log(data);
  })
}


  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 160 },
    {
      field: "phone",
      headerName: "Phone",

      width: 150,
    },
    {
      field: "plan",
      headerName: "Plan",

      width: 90,
    },
    {
      field: "status",
      headerName: "Status",

      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",

      width: 90,
    },
  ];
  const rows = [
    {
      id: 1,
      name: "Snow",
      email: "snow@gmail.com",
      age: 35,
      phone: "7012237376",
      plan: "Free",
      status:true,
      actions:"sd"
    },
  ];
  return (
    <div>
      <MiniDrawer>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </MiniDrawer>
    </div>
  );
}

export default Professionals;
