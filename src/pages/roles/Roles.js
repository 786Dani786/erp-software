import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TablePagination,
} from "@mui/material";
import roleService from "./roles.service";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";

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

function Roles() {
  const [role_name, setRoleName] = useState();
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const getAllRoles = async () => {
    try {
      await roleService.getRoles().then(
        (response) => {
          setData(response.data.response.roles);
          setCount(response.data.response.count);
        },
        (error) => {
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  const addRoleHandler = async (e) => {
    e.preventDefault();
    try {
      await roleService.addRole(role_name).then(
        (response) => {
          toast.success("Role Added Successfully!");
          console.log("response is ", response);
        },
        (error) => {
          toast.error("Something went wrong!");
          console.log("Error is ", error);
        }
      );
    } catch (err) {
      console.log("Catch Error is ", err);
    }
  };
  useEffect(() => {
    getAllRoles();
  }, []);
  const headerStyle = { margin: "10px 0" };
  const textStyle = { padding: "0px" };

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
            Roles
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
            Add New Role
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Roll Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell>{row.role_name}</TableCell>
                    <TableCell>
                      {moment(row.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton aria-label="delete">
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <ToastContainer />
      {/* Dialog Start */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New Role
        </BootstrapDialogTitle>
        <form onSubmit={addRoleHandler}>
          <DialogContent dividers>
            <TextField
              sx={{ width: "500px" }}
              margin="dense"
              id="outlined-basic"
              label="Role Name"
              variant="outlined"
              fullWidth
              placeholder="Enter Role Name"
              value={role_name}
              onChange={(e) => setRoleName(e.target.value)}
            />
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
      {/* Dialog Close */}
    </div>
  );
}

export default Roles;
