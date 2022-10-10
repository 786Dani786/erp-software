import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ROUTES from "../../routes";
import { Routes, Route, Link } from "react-router-dom";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
  Drafts,
  ExpandLess,
  ExpandMore,
  Inbox,
  Send,
  SignalCellularAlt,
  StarBorder,
  Timeline,
} from "@mui/icons-material";
import { Collapse, Paper, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AssessmentIcon from "@mui/icons-material/Assessment";
import authServices from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import PunchClockIcon from "@mui/icons-material/PunchClock";

const drawerWidth = 240;

const styles = {
  // this group of buttons will be aligned to the right side
  toolbarButtons: {
    marginLeft: "auto",
  },
};
function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandle = () => {
    toast.success("Logout Successfully!");
    authServices.logout();
    navigate("/");
    window.location.reload();
    // window.location.href = "/";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openNav, setOpen] = React.useState(false);

  const handleClickNav = () => {
    setOpen(!openNav);
  };

  const [openNavAdmin, setOpenAdmin] = React.useState(false);

  const handleClickNavAdmin = () => {
    setOpenAdmin(!openNavAdmin);
  };

  const drawer = (
    <div>
      <Toolbar />
      {/* <List>
        {ROUTES.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List> */}
      <List>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={handleClickNavAdmin}>
          <ListItemIcon>
            <SettingsSuggestIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Administration" />
          {openNavAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNavAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/business"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BusinessIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Business" />
              </ListItemButton>
            </Link>
            <Link
              to="/branch"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StoreIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Branch" />
              </ListItemButton>
            </Link>
            <Link to="/roles" style={{ color: "#fff", textDecoration: "none" }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PunchClockIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
            </Link>
            <Link to="/users" style={{ color: "#fff", textDecoration: "none" }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PeopleAltIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link
          to="/categories"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </Link>
        <Link to="/brands" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <BrandingWatermarkIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Brands" />
          </ListItemButton>
        </Link>
        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <Inventory2Icon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </Link>
        <Link to="/stock" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <MarkunreadMailboxIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Stocks" />
          </ListItemButton>
        </Link>
        <Link to="/price" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <MonetizationOnIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Prices" />
          </ListItemButton>
        </Link>
        <Link to="/orders" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <BorderColorIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </Link>
        <Link to="/expenses" style={{ color: "#fff", textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <LocalAtmIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={handleClickNav}>
          <ListItemIcon>
            <AssessmentIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {openNav ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNav} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/reports"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SignalCellularAlt style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Sales Report" />
              </ListItemButton>
            </Link>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Timeline style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Annual Report" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const footerStyle = {
    position: "fixed",
    // left: { lg: `${drawerWidth}px` },
    // left: `${drawerWidth}px`,

    bottom: "0",
    width: "100%",
    background: "#fff",
    color: "#000",
    height: "50px",
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Router> */}
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#fff",
          color: "#000",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            ERP
          </Typography> */}
          <div style={{ marginLeft: "auto" }}>
            <IconButton color="inherit">
              <CircleNotificationsOutlinedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <PermIdentityOutlinedIcon />
            </IconButton>
          </div>
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
            {/* <Link to="/profile" sx={{ textDecoration: "none" }}> */}
            <MenuItem component={Link} to={"/profile"}>
              <Avatar /> Profile
            </MenuItem>
            {/* </Link> */}
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logoutHandle}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#121828",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#121828",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />
        {ROUTES.map((item, index) => (
          <Routes key={index}>
            <Route path={item.path} element={<item.component />} />
          </Routes>
        ))}
        <Paper
          sx={{ left: { md: "0", lg: `${drawerWidth}px` } }}
          style={footerStyle}
        >
          <Typography sx={{ color: "gray", mt: "15px", ml: "10px" }}>
            Design and Developed by{" "}
            <a
              href="https://xillixtech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              xillixtech.com
            </a>
          </Typography>
        </Paper>
        {/* <AppBar
          position="fixed"
          left={`${drawerWidth}px`}
          bottom="0"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "#fff",
            color: "#000",
          }}
        >
          <Typography>
            Design and develop by <a href="">xillix.com</a>
          </Typography>
        </AppBar> */}
      </Box>
      {/* </Router> */}

      <ToastContainer />
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

// function Header() {
//   return <div>Header</div>;
// }

// export default Header;
