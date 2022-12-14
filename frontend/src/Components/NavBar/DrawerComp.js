import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import swal from 'sweetalert';
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
import React, { useEffect, useState } from "react";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { Dashboard, Person, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GoogleMaps from "../SelectLocation/SelectPlaces";

function DrawerComp() {
  const navigate = useNavigate();

  const theme = useTheme();

  const [userData, setuserData] = useState({});
  const [userloged, setuserloged] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
     
    if (userInfo) {
     
      setuserData(JSON.parse(userInfo));
     
      setuserloged(true);
    } else {
      setuserData(null);
      setuserloged(false);
    }

    return () => {};
  }, [   ]);
   
  const logout = () => {
    swal({
      title: "Are you sure?",
      text: "you want to logout ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
       
        
       localStorage.removeItem("userInfo");
    setuserData(false);
    setuserloged(false); 


      } 
    });
    
  };

  const drawerNav = [
    {
      label: "Browse Professionals",
      icon: <PeopleOutlinedIcon />,
      nav: "/browse-professionals",
      status: true,
    },

    {
      label: "Login",
      icon: <LoginOutlinedIcon />,
      nav: "/login",
      status: !userloged,
    },
    {
      label: "Create Account",
      icon: <PersonAddAltOutlinedIcon />,
      nav: "/create-account",
      status: !userloged,
    },
  ];
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
       



        <List style={{ color: "grey" }}>
      {/* <GoogleMaps/> */}

        <ListItemButton
              onClick={() => {
          userData? navigate('profile'):navigate('/login')
              }}
            > 
              <Person />

              <ListItemIcon style={{ marginLeft: "15px" }}>
                <ListItemText>{userData?userData.username:"profile" }</ListItemText>
              </ListItemIcon>
            </ListItemButton>

        { userData?<> <ListItemButton
              onClick={() => {
          navigate('/dashboard')
              }}
            > 
              <Dashboard />

              <ListItemIcon style={{ marginLeft: "15px" }}>
                <ListItemText>Dashboard</ListItemText>
              </ListItemIcon>
            </ListItemButton></>:null  
}

          {drawerNav.map((data, index) =>
            data.status ? (
              <ListItemButton
                onClick={() => {
                  navigate(data.nav);
                }}
                key={index}
              >
                {data.icon}

                <ListItemIcon style={{ marginLeft: "15px" }}>
                  <ListItemText>{data.label}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ) : null
          )}
          {userloged ? (
            <ListItemButton
              onClick={() => {
                logout();
              }}
            >
              <LogoutRoundedIcon />

              <ListItemIcon style={{ marginLeft: "15px" }}>
                <ListItemText>Logout</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ) : null}
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
