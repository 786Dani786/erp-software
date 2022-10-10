import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import userService from "./user.service";
import roleService from "../roles/roles.service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import authServices from "../../services/auth.service";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Users() {
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState();
  const [roles, setRoles] = useState([]);
  const [user_id, setUserId] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      password: "",
      phone: "",
      role_id: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string()
        .min(5, "Must be minimum 5 characters or more")
        .required("User Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Must be minimum 3 characters or more")
        .required("Password is required"),
      phone: Yup.number("Must be Number"),
      role_id: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        await userService.addUser(values).then(
          (response) => {
            toast.success("User Added Successfully!");
            getAllUsers();
            handleClose();
          },
          (error) => {
            toast.error("Something went wrong!");
            console.log("Error is ", error);
          }
        );
      } catch (err) {
        console.log("Catch Error is ", err);
      }
    },
  });

  //   for add dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    getAllRoles();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm({ values: "" });
  };
  // end of add Dialog

  //   for delete dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleDelClickOpen = (id) => {
    setUserId(id);
    setOpenDialog(true);
  };
  const handleDelClose = () => {
    setUserId("");
    setOpenDialog(false);
  };
  // end of delete Dialog

  const navigate = useNavigate();
  const getAllUsers = async () => {
    try {
      await userService.getUsers().then(
        (response) => {
          setUsers(response.data.response.users);
          setCount(response.data.response.count);
        },
        (error) => {
          console.log("Error is ", error);
          if (error.response.status == "401") {
            authServices.logout();
            navigate("/");
            window.location.reload();
          }
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  const getAllRoles = async () => {
    try {
      await roleService.getRoles().then(
        (response) => {
          setRoles(response.data.response.roles);
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  const deleteUser = async () => {
    try {
      await userService.delUser(user_id).then(
        (response) => {
          toast.success("User Deleted Successfully!");
          getAllUsers();
          handleDelClose();
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Exception error ", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  const errorStyle = {
    color: "red",
    fontWeight: "300",
    fontSize: 15,
    width: "100%",
    margin: "0px auto 15px auto",
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Grid container spacing={2} style={headerStyle}>
        <Grid item xs={8} style={textStyle}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: "600" }}>
            Users
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          style={textStyle}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 2 }}
            onClick={handleClickOpen}
          >
            Add New User
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 580, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold", pr: 5 }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user._id}
                    </TableCell>
                    <TableCell>{user.user_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role_id.role_name}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelClickOpen(user._id)}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      {/* Add Dialog Start */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New User
        </BootstrapDialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              margin="dense"
              name="user_name"
              label="User Name"
              variant="outlined"
              fullWidth
              placeholder="Enter User Name"
              value={formik.values.user_name}
              onChange={formik.handleChange}
            />
            {formik.touched.user_name && formik.errors.user_name ? (
              <p style={errorStyle}>{formik.errors.user_name}</p>
            ) : null}
            <TextField
              margin="dense"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              name="email"
              placeholder="Enter User Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <p style={errorStyle}>{formik.errors.email}</p>
            ) : null}
            <TextField
              margin="dense"
              label="Password"
              // type="password"
              variant="outlined"
              fullWidth
              name="password"
              placeholder="Enter User Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <p style={errorStyle}>{formik.errors.password}</p>
            ) : null}
            <TextField
              margin="dense"
              label="Phone No"
              variant="outlined"
              fullWidth
              type="number"
              name="phone"
              placeholder="Enter Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p style={errorStyle}>{formik.errors.phone}</p>
            ) : null}
            <InputLabel id="roles-label">Roles</InputLabel>
            <Select
              labelId="roles-label"
              label="Role"
              name="role_id"
              fullWidth
              value={formik.values.role_id}
              onChange={formik.handleChange}
            >
              <MenuItem selected value="">
                <em>Select the Role</em>
              </MenuItem>
              {roles
                ? roles.map((role, index) => (
                    <MenuItem key={index} value={role._id}>
                      {role.role_name}
                    </MenuItem>
                  ))
                : null}
            </Select>
            {formik.touched.role_id && formik.errors.role_id ? (
              <p style={errorStyle}>{formik.errors.role_id}</p>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  autoFocus
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                item
                xs={6}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="success"
                  autoFocus
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </BootstrapDialog>
      {/* Add Dialog Close */}

      {/* Delete Dialog Start */}
      <BootstrapDialog
        onClose={handleDelClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDelClose}
        >
          Delete User
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you wanted to delete this User ????
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                autoFocus
                variant="outlined"
                color="success"
                onClick={handleDelClose}
              >
                No
              </Button>
            </Grid>
            <Grid
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              item
              xs={6}
            >
              <Button
                variant="outlined"
                color="error"
                autoFocus
                onClick={deleteUser}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
      {/* Add Dialog Close */}
      <ToastContainer />
    </div>
  );
}

export default Users;
