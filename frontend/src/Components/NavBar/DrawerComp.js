import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import {
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function DrawerComp() {
   const navigate =useNavigate()
    const drawerNav=[ { label:"Browse Professionals", icon:(<PeopleOutlinedIcon  />) ,nav:'/browse' },
    { label:"Login", icon:(<LoginOutlinedIcon />) ,nav:'/login' },
    { label:"Create Account", icon:(<PersonAddAltOutlinedIcon />) ,nav:'/create-account' },
]
  const [openDrawer, setopenDrawer] = useState(false);

  return (
    <React.Fragment>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => {
          setopenDrawer(!openDrawer);
        }}
        onOpen={() => setopenDrawer(true)}
      >
        <ListItem>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search.."
            inputProps={{ "aria-label": "search......." }}
          ></InputBase>
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search.....">
            <Search />
          </IconButton>
        </ListItem>



        <List style={{color:"grey"}}>

       {     drawerNav.map((data,index)=>(

         <ListItemButton onClick={()=>{
          navigate(data.nav)
         }} key={index}>
               { data.icon }
            <ListItemIcon style={{marginLeft:"15px"}} >
         
              <ListItemText>{data.label}</ListItemText>
             
            </ListItemIcon>
          </ListItemButton>
       ))
         
}



        </List>



      </SwipeableDrawer>
      <IconButton
        onClick={() => {
          setopenDrawer(!openDrawer);
        }}
      >
        <DragHandleRoundedIcon />
      </IconButton>
    </React.Fragment>
  );
}

export default DrawerComp;
