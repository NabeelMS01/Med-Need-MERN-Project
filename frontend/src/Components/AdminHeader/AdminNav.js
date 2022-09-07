import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { DrawerContext } from "../../contexts/contexts";
import { Home, Logout, MenuRounded, Message, Settings } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { open, setOpen } = useContext(DrawerContext);
  const [userData, setuserData] =  useState({});
  const [anchorEl, setAnchorEl] =  useState(null);
  const [deleAlert, setdeleAlert] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu = [
    { title: "Dashboard", route: "/admin-dashboard", icon: <DashboardIcon /> },
    {
      title: "Professionals",
      route: "/admin-professionals",
      icon: <PeopleIcon />,
    },
    { title: "clients", route: "/admin-clients", icon: <PeopleIcon /> },
    { title: "messages", route: "/admin-message/:id", icon: <Message /> },

    {
      title: "Pending requests",
      route: "/admin-pending-requests",
      icon: <PendingActionsIcon />,
    },
    {
      title: "Admins",
      route: "/admin-all-admins",
      icon: <AdminPanelSettingsIcon />,
    },
    {
      title: "Manage plans",
      route: "/admin-manage-plan",
      icon: <WorkspacePremiumIcon />,
    },
    {
      title: "Manage Category",
      route: "/admin-manage-category",
      icon: <CategoryIcon />,
    },
    {
      title: "Transactions",
      route: "/admin-manage-plan",
      icon: <PointOfSaleIcon />,
    },
  ];
 
  const openpro = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAlert = (event) => {
   
  
    setdeleAlert(!deleAlert);
   
    console.log(deleAlert);
  };
 const closeAlert =()=>{
  setdeleAlert(!deleAlert);
 }
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const logout=()=>{
  localStorage.removeItem('adminInfo')
 
  setAnchorEl(null);
  navigate('/admin')
  handleClose()
 
  }


  async function getUser(data) {
    setuserData(data);
  }
  React.useEffect(() => {
    const userdata = localStorage.getItem("adminInfo");
    const userjson = JSON.parse(userdata);

    getUser(userjson);
console.log(deleAlert);
    return () => {};
  }, [deleAlert]);
 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "#257069" }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuRounded />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Med need admin
          </Typography>

          {
            <Tooltip title="Profile" sx={{ margin: "auto" }}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, marginLeft: "auto" }}
                aria-controls={openpro ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openpro ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {" "}
                  <Avatar />{" "}
                </Avatar>
              </IconButton>
            </Tooltip>
          }

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openpro}
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
            <MenuItem>
              <Avatar />
              {userData ? userData.name : "Profile"}
            </MenuItem>

            <Divider />

            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={ ()=>{navigate('/')}   }>
              <ListItemIcon>
                <Home fontSize="small" />
              </ListItemIcon>
             Go Home
            </MenuItem>
            <MenuItem onClick={ handleAlert   }>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  navigate(data.route);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  title={data.title}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
              {index === 6 ? <Divider /> : null}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>
        <Dialog
          open={!deleAlert}
          onClose={handleAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to logout?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAlert}>No</Button>
            <Button onClick={logout} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div> 
        {children}

       
      

      </Box>
    
      
    </Box>



  );
}
