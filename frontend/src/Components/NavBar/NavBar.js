import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  AddCircleOutlineOutlined,
  Logout,
  PersonAdd,
  Search,
  Settings,
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fontSize } from "@mui/system";
import DrawerComp from "./DrawerComp";
import swal from 'sweetalert';
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  navBar: {
    backgroundColor: "#fafafa",
    boxShadow: "none",
    fontWeight: "bold",
    color: "#257069",
  },
  createBtn: {
    color: "#257069",
  },
  textBtn: {
    color: "#257069",
  },
}));

function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [userData, setuserData] = useState({});
    const [userPro, setuserPro] = useState('');
  const classes = useStyle();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
    
      setuserData(JSON.parse(userInfo));
        
      setuserPro(userData.username )
    } else {
      setuserData(null);
    }

    return () => {};
  }, [ ]);

 
 
  
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
    // setuserloged(false); 


      } 
    });
    
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <AppBar className={classes.navBar} position="relative">
        <Toolbar>
          <Typography style={{ fontWeight: "bolder" }} variant="h5">
            Med <AddCircleOutlineOutlined /> Need
          </Typography>

          <div style={{ marginLeft: "auto" }}>
            {!isMatch ? (
              <>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search.."
                  inputProps={{ "aria-label": "search......." }}
                ></InputBase>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search....."
                >
                  <Search />
                </IconButton>
                <Button
                  style={{ marginLeft: "25px", fontWeight: "bold" }}
                  variant="text"
                >
                  Browse Professionals
                </Button>
                {!userData ? (
                  <>
                    <Button
                      style={{ marginLeft: "25px", fontWeight: "bold" }}
                      variant="text"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      style={{
                        marginLeft: "25px",
                        fontWeight: "bold",
                        borderColor: "#257069",
                        border: "solid 1.5px",
                        color: "#257069",
                      }}
                      variant="outlined"
                      onClick={() => {
                        navigate("/create-account");
                      }}
                    >
                      Create Account
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                    onClick={()=>{navigate('/dashboard')}}
                      style={{ marginLeft: "25px", fontWeight: "bold", marginRight: "25px", }}
                      variant="text"
                    >
                      Dashboard
                    </Button>
                  </>
                )}
                {userData ? (
                  <Tooltip title="Profile">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32}}>     <Avatar />    </Avatar>
                    </IconButton>
                  </Tooltip>
                ) : null}

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={()=>{navigate('/profile')}} >
                    <Avatar />{ userData?  userData.username : "Profile"}
                  </MenuItem>
                  
                  <Divider />
                   
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <DrawerComp />
            )}
          </div>
        </Toolbar>

        <div></div>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
